import fs from 'node:fs';
import path from 'node:path';

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7vlmtiag';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';
const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gainleadx.com';
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

async function fixPostImage() {
  if (!SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_API_WRITE_TOKEN missing.');
    process.exit(1);
  }

  console.log('Fetching latest post to update image...');
  const query = encodeURIComponent('*[_type == "post"] | order(publishedAt desc)[0]{ _id, title }');
  const getUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;
  
  const getRes = await fetch(getUrl);
  const { result: post } = await getRes.json();

  if (!post) {
    console.log('No post found to update.');
    return;
  }

  console.log(`Updating cover image for [${post._id}] "${post.title}"...`);

  const mutateUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;
  const mutateRes = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          patch: {
            id: post._id,
            set: {
              mainImage: {
                _type: 'image',
                url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
                alt: 'BBC Radio broadcasting microphone and on-air production studio',
                caption: 'Broadcast transmission desk and professional radio studio equipment.',
                credit: 'Broadcasting & Media Archive / Gainleadx',
              },
            },
          },
        },
      ],
    }),
  });

  if (!mutateRes.ok) {
    throw new Error(`Mutation failed: ${await mutateRes.text()}`);
  }

  console.log('✓ Successfully replaced image with broadcast radio studio photo!');

  if (REVALIDATION_SECRET) {
    console.log('Purging cache...');
    await fetch(`${SITE_URL}/api/revalidate?secret=${encodeURIComponent(REVALIDATION_SECRET)}`, { method: 'POST' });
    console.log('✓ Cache purged!');
  }
}

fixPostImage().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
