/**
 * Script to safely delete dummy or mock posts from Sanity CMS
 * -------------------------------------------------------------
 * Usage:
 *   node scripts/delete-dummy-sanity-posts.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7vlmtiag';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';
const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

// Dummy slugs and titles from mock datasets
const DUMMY_IDENTIFIERS = [
  'the-nhs-in-crisis-backdoor-privatisation-or-collapse',
  'small-boats-stalemate-channel-asylum-policy',
  'two-child-benefit-cap-parliament-debate',
  'londons-ghost-mansions-empty-towers-housing-crisis',
  'the-crowns-hidden-billions-monarchy-tax-wealth',
  'sewage-in-britains-rivers-water-privatisation-scandal',
  'public-order-act-facial-recognition-criminalising-dissent',
  'asylum-hotel-profiteers',
  'london-councils-on-the-brink',
  'featured-1',
  'post-1',
  'post-2',
  'post-3',
  'post-4',
  'post-5',
  'post-6',
];

const deleteAll = process.argv.includes('--all');

async function deleteDummyPosts() {
  if (!SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_API_WRITE_TOKEN is missing in environment.');
    process.exit(1);
  }

  console.log(`🔍 Querying Sanity (${SANITY_PROJECT_ID}/${SANITY_DATASET}) for documents to delete...`);

  const query = encodeURIComponent('*[_type == "post"]{ _id, title, "slug": slug.current }');
  const queryUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;

  const queryRes = await fetch(queryUrl);
  if (!queryRes.ok) {
    throw new Error(`Sanity Query Error: ${await queryRes.text()}`);
  }

  const { result } = await queryRes.json();
  const toDelete = [];

  for (const doc of result) {
    const isDummy =
      deleteAll ||
      DUMMY_IDENTIFIERS.includes(doc._id) ||
      (doc.slug && DUMMY_IDENTIFIERS.includes(doc.slug)) ||
      (doc.title && doc.title.toLowerCase().includes('dummy')) ||
      (doc.title && doc.title.toLowerCase().includes('sample')) ||
      (doc.slug && doc.slug.includes('baillie')) ||
      (doc.title && doc.title.includes('BAILLIE'));

    if (isDummy) {
      toDelete.push(doc);
    }
  }

  if (toDelete.length === 0) {
    console.log(`✓ No matching posts found in Sanity database.`);
    return;
  }

  console.log(`Found ${toDelete.length} post(s) to delete:`);
  toDelete.forEach((d) => console.log(`  - [${d._id}] ${d.title} (/blog/${d.slug})`));

  const mutateUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;
  const mutations = toDelete.map((d) => ({ delete: { id: d._id } }));

  const mutateRes = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });

  if (!mutateRes.ok) {
    throw new Error(`Delete failed: ${await mutateRes.text()}`);
  }

  console.log(`✓ Successfully deleted ${toDelete.length} post(s) from Sanity CMS.`);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gainleadx.com';
  const secret = process.env.REVALIDATION_SECRET;
  if (secret) {
    console.log(`⚡ Purging edge cache on ${siteUrl}...`);
    try {
      await fetch(`${siteUrl}/api/revalidate?secret=${encodeURIComponent(secret)}`, { method: 'POST' });
      console.log(`✓ Cache purged successfully!`);
    } catch (e) {
      console.warn(`Could not purge cache: ${e.message}`);
    }
  }
}

deleteDummyPosts().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
