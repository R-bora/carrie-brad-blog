/**
 * Gainleadx Autonomous Blog Publishing Pipeline
 * -------------------------------------------------------------
 * Workflow:
 * 1. Keyword Research & Intent: Reads targeted high-search-volume UK controversial keyword (from Ahrefs API or queue).
 * 2. Investigative Drafting: Calls Anthropic Claude 3.5 Sonnet with Gainleadx editorial broadsheet prompt.
 * 3. Sanity CMS Ingestion: Posts structured document (PortableText) directly into Sanity CMS database.
 * 4. Instant On-Demand Revalidation: Triggers Next.js ISR on gainleadx.com so the article goes live instantly.
 *
 * Usage:
 *   node scripts/auto-blog-pipeline.mjs
 *   node scripts/auto-blog-pipeline.mjs --keyword "NHS private agency nurse costs" --category "NHS & HEALTH"
 *   node scripts/auto-blog-pipeline.mjs --draft (saves as draft instead of publishing immediately)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load .env.local if present
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

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';
const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gainleadx.com';
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

// Parse CLI args
const args = process.argv.slice(2);
const isDraft = args.includes('--draft');
let argKeyword = null;
let argCategory = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--keyword' && args[i + 1]) argKeyword = args[i + 1];
  if (args[i] === '--category' && args[i + 1]) argCategory = args[i + 1];
}

async function getKeywordTask() {
  if (argKeyword) {
    return {
      keyword: argKeyword,
      category: argCategory || 'POLITICS',
      targetQuestions: [`Comprehensive investigative overview of ${argKeyword}`],
    };
  }

  // Load from Ahrefs research queue
  const queuePath = path.resolve(__dirname, 'keywords-queue.json');
  if (fs.existsSync(queuePath)) {
    const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
    if (queue.length > 0) {
      return queue[Math.floor(Math.random() * queue.length)];
    }
  }

  return {
    keyword: 'NHS hospital trust PFI debt and backlog',
    category: 'NHS & HEALTH',
    targetQuestions: ['How much public funding goes to private hospital equity?'],
  };
}

async function generateArticleWithClaude(task) {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('Missing ANTHROPIC_API_KEY. Add it to .env.local to generate articles with Claude.');
  }

  console.log(`\n🤖 [Step 1/3] Generating investigative exposé with Claude 3.5 Sonnet...`);
  console.log(`   Target Keyword: "${task.keyword}"`);
  console.log(`   Category: ${task.category}`);

  const systemPrompt = `You are the Senior Chief Investigative Reporter for "Gainleadx", a prominent British broadsheet publication investigating the most controversial topics, policy failures, financial paper trails, and institutional scandals across the United Kingdom.
Your writing style is forensic, rigorous, authoritative, and unapologetic. You cite official statistics, parliamentary inquiries, National Audit Office findings, and corporate ledger realities.
You must output ONLY valid, unescaped JSON matching the exact schema requested below, with no markdown code fences or conversational preamble.`;

  const userPrompt = `Conduct an exhaustive investigative inquest on the following controversial UK debate:
Primary Keyword: "${task.keyword}"
Debate Category: "${task.category}"
Key Inquest Questions to address:
${task.targetQuestions ? task.targetQuestions.map((q) => `- ${q}`).join('\n') : ''}

Return a JSON object with this EXACT structure:
{
  "title": "A sharp, capitalized broadsheet headline under 100 characters",
  "slug": "url-friendly-slug-with-hyphens",
  "category": "${task.category}",
  "excerpt": "A powerful 2-3 sentence teaser summarizing the investigation and the scandal or policy debate.",
  "estimatedReadTime": "6 MIN READ",
  "unsplashImageKeywords": "two or three search words for finding a high-contrast editorial photo (e.g. 'westminster big ben night', 'hospital emergency corridor')",
  "sections": [
    {
      "heading": "Section H2 Heading",
      "paragraphs": [
        "First in-depth paragraph presenting verified facts, figures, and historical policy background...",
        "Second paragraph providing forensic detail, commercial contracts, or quote from whistleblowers/audits..."
      ],
      "calloutQuote": "A poignant, unvarnished quotation or critical takeaway regarding this aspect of the controversy."
    },
    {
      "heading": "Second Section H2 Heading",
      "paragraphs": [
        "In-depth analysis of parliamentary debate, economic impact, or institutional pushback...",
        "Further investigative findings examining who profits and who bears the cost..."
      ]
    },
    {
      "heading": "The Policy Crossroad & Public Inquest",
      "paragraphs": [
        "Summary of ongoing legal challenges, proposed reforms, and future outlook for British taxpayers..."
      ]
    }
  ]
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 3500,
      temperature: 0.3,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API Error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  const rawText = result.content[0].text.trim();

  // Strip markdown code fences if model enclosed them
  const cleanedJson = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  return JSON.parse(cleanedJson);
}

function convertToPortableText(articleData) {
  const blocks = [];
  let keyIndex = 1;

  for (const section of articleData.sections) {
    if (section.heading) {
      blocks.push({
        _type: 'block',
        _key: `head-${keyIndex++}`,
        style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: `span-${keyIndex++}`, text: section.heading, marks: [] }],
      });
    }

    if (section.paragraphs) {
      for (const p of section.paragraphs) {
        blocks.push({
          _type: 'block',
          _key: `p-${keyIndex++}`,
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: `span-${keyIndex++}`, text: p, marks: [] }],
        });
      }
    }

    if (section.calloutQuote) {
      blocks.push({
        _type: 'block',
        _key: `quote-${keyIndex++}`,
        style: 'blockquote',
        markDefs: [],
        children: [{ _type: 'span', _key: `span-${keyIndex++}`, text: section.calloutQuote, marks: [] }],
      });
    }
  }

  return blocks;
}

async function publishToSanity(articleData) {
  if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) {
    console.warn(`\n⚠️  [Step 2/3] Skipping live Sanity CMS sync:`);
    console.warn(`   NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN not set in environment.`);
    console.warn(`   Generated article saved locally to 'scripts/generated-preview.json' for inspection.`);
    fs.writeFileSync(
      path.resolve(__dirname, 'generated-preview.json'),
      JSON.stringify(articleData, null, 2),
      'utf8'
    );
    return null;
  }

  console.log(`\n📤 [Step 2/3] Uploading document to Sanity Studio (${SANITY_PROJECT_ID}/${SANITY_DATASET})...`);

  const docId = isDraft ? `drafts.post-${Date.now()}` : `post-${Date.now()}`;
  const portableTextBlocks = convertToPortableText(articleData);

  const document = {
    _id: docId,
    _type: 'post',
    title: articleData.title,
    slug: {
      _type: 'slug',
      current: articleData.slug,
    },
    category: articleData.category,
    isFeatured: false,
    excerpt: articleData.excerpt,
    publishedAt: new Date().toISOString(),
    body: portableTextBlocks,
    mainImage: {
      _type: 'image',
      alt: articleData.title,
      url: `https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80`,
    },
  };

  const endpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
    },
    body: JSON.stringify({
      mutations: [
        {
          createOrReplace: document,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sanity Mutation Error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  console.log(`   ✓ Successfully published document to Sanity! Doc ID: ${docId}`);
  return result;
}

async function triggerRevalidation() {
  if (!REVALIDATION_SECRET) return;

  console.log(`\n⚡ [Step 3/3] Triggering instant On-Demand Revalidation on ${SITE_URL}...`);
  try {
    const res = await fetch(`${SITE_URL}/api/revalidate?secret=${encodeURIComponent(REVALIDATION_SECRET)}`, {
      method: 'POST',
    });
    if (res.ok) {
      console.log(`   ✓ Cache purged! The new article is immediately live on ${SITE_URL}`);
    } else {
      console.warn(`   Revalidation endpoint responded with status: ${res.status}`);
    }
  } catch (err) {
    console.warn(`   Could not trigger revalidation: ${err.message}`);
  }
}

async function main() {
  console.log(`=======================================================`);
  console.log(`  GAINLEADX • AUTONOMOUS INVESTIGATIVE BLOG PIPELINE   `);
  console.log(`=======================================================`);

  try {
    const task = await getKeywordTask();
    const article = await generateArticleWithClaude(task);

    console.log(`\nHeadline Generated: "${article.title}"`);
    console.log(`Slug: /blog/${article.slug}`);
    console.log(`Excerpt: ${article.excerpt.slice(0, 120)}...`);

    await publishToSanity(article);
    await triggerRevalidation();

    console.log(`\n✨ Pipeline complete! You can view or edit this post in Sanity Studio at:`);
    console.log(`   ${SITE_URL}/studio\n`);
  } catch (error) {
    console.error(`\n❌ Pipeline Error:`, error.message);
    process.exit(1);
  }
}

main();
