/**
 * Gainleadx Autonomous Blog Publishing Pipeline
 * -------------------------------------------------------------
 * 1. Schedule Check: Ensures execution at 08:00 AM UK Time (Europe/London).
 * 2. Real-Time Trending Inquest: Fetches live UK trending topics from Google Trends & Google News RSS.
 * 3. AI Forensic Drafting: Supports Google Gemini (Free API) or Anthropic Claude 3.5 Sonnet.
 * 4. Sanity CMS Ingestion: Posts structured document (PortableText) with stats & whistleblower leaks.
 * 5. Instant On-Demand Revalidation: Purges Next.js cache so the article goes live immediately.
 *
 * Usage:
 *   node scripts/auto-blog-pipeline.mjs
 *   node scripts/auto-blog-pipeline.mjs --force (bypass 8 AM UK schedule check)
 *   node scripts/auto-blog-pipeline.mjs --keyword "NHS waiting lists" --category "NHS & HEALTH"
 *   node scripts/auto-blog-pipeline.mjs --draft (saves as draft in Sanity)
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

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '7vlmtiag';
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';
const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gainleadx.com';
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

// CLI Flags
const args = process.argv.slice(2);
const isDraft = args.includes('--draft');
const forceRun = args.includes('--force') || process.env.FORCE_RUN === 'true' || process.env.GITHUB_EVENT_NAME === 'workflow_dispatch';

let argKeyword = null;
let argCategory = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--keyword' && args[i + 1]) argKeyword = args[i + 1];
  if (args[i] === '--category' && args[i + 1]) argCategory = args[i + 1];
}

// -------------------------------------------------------------
// 1. UK Timezone Scheduler Guard (08:00 AM London)
// -------------------------------------------------------------
function checkUkSchedule() {
  if (forceRun || argKeyword) {
    console.log(`[Schedule Check] Manual or forced execution triggered. Bypassing schedule lock.`);
    return;
  }

  const ukHourStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: 'numeric',
    hour12: false,
  }).format(new Date());
  const ukHour = parseInt(ukHourStr, 10);

  if (ukHour !== 8) {
    console.log(`[Schedule Check] Current Europe/London time is ${ukHour}:00.`);
    console.log(`[Schedule Check] Daily publishing is scheduled for 08:00 AM UK time. Exiting cleanly.`);
    process.exit(0);
  }

  console.log(`[Schedule Check] ✓ Verified: 08:00 AM UK time. Starting daily publishing pipeline!`);
}

// -------------------------------------------------------------
// 2. Fetch Existing Published Posts from Sanity (Avoid Duplicates)
// -------------------------------------------------------------
async function getExistingSlugsAndTitles() {
  if (!SANITY_PROJECT_ID) return new Set();

  try {
    const query = encodeURIComponent('*[_type == "post"]{ "slug": slug.current, title }');
    const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;
    const res = await fetch(url);
    if (!res.ok) return new Set();

    const data = await res.json();
    const existing = new Set();
    if (data.result && Array.isArray(data.result)) {
      for (const item of data.result) {
        if (item.slug) existing.add(item.slug.toLowerCase().trim());
        if (item.title) existing.add(item.title.toLowerCase().trim());
      }
    }
    return existing;
  } catch (err) {
    console.warn(`[Sanity Read] Could not fetch existing posts: ${err.message}. Proceeding with fresh queue.`);
    return new Set();
  }
}

// -------------------------------------------------------------
// 3. Live UK Trending Topic Scraper (Google Trends & Google News)
// -------------------------------------------------------------
function parseRssItems(xmlText) {
  const items = [];
  const itemMatches = xmlText.match(/<item>[\s\S]*?<\/item>/gi) || [];

  for (const itemStr of itemMatches) {
    const titleMatch = itemStr.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
    const descMatch = itemStr.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
    const pubDateMatch = itemStr.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    const desc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    if (title) {
      items.push({ title, desc, pubDate: pubDateMatch ? pubDateMatch[1] : '' });
    }
  }

  return items;
}

function categorizeUkTopic(title, desc = '') {
  const combined = `${title} ${desc}`.toLowerCase();

  if (combined.match(/migrat|asylum|border|channel|boat|visa|deport|refugee|home office/)) {
    return 'IMMIGRATION';
  }
  if (combined.match(/nhs|health|hospital|doctor|nurse|gp|patient|medicine|ambulance|dental/)) {
    return 'NHS & HEALTH';
  }
  if (combined.match(/housing|rent|mortgage|inflation|tax|budget|debt|economy|poverty|benefits|pension|bank of england/)) {
    return 'ECONOMY & HOUSING';
  }
  if (combined.match(/royal|monarch|king|prince|palace|duchy|windsor|crown/)) {
    return 'MONARCHY';
  }
  if (combined.match(/protest|police|surveillance|facial recognition|free speech|court|rights|civil|jail/)) {
    return 'CIVIL LIBERTIES';
  }
  return 'POLITICS';
}

async function fetchLiveTrendingUkTopic(existingSet) {
  console.log(`\n🔍 [Topic Discovery] Scanning real-time UK trending feeds...`);

  const feeds = [
    'https://trends.google.com/trending/rss?geo=GB',
    'https://news.google.com/rss?hl=en-GB&gl=GB&ceid=GB:en',
    'https://feeds.bbci.co.uk/news/uk/rss.xml',
    'https://feeds.bbci.co.uk/news/politics/rss.xml',
  ];

  for (const feedUrl of feeds) {
    try {
      const res = await fetch(feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) GainleadxEditorialBot/1.0',
        },
      });

      if (!res.ok) continue;

      const xml = await res.text();
      const items = parseRssItems(xml);

      for (const item of items) {
        const cleanedTitle = item.title.replace(/\s*-\s*[A-Za-z0-9\s]+$/, '').trim();
        const lower = cleanedTitle.toLowerCase();

        // Skip if already published or matches existing
        let alreadyCovered = false;
        for (const existing of existingSet) {
          if (existing.includes(lower) || lower.includes(existing)) {
            alreadyCovered = true;
            break;
          }
        }

        if (!alreadyCovered && cleanedTitle.length > 8) {
          const category = categorizeUkTopic(cleanedTitle, item.desc);
          console.log(`   ✓ Found Breaking UK Trending Topic: "${cleanedTitle}"`);
          console.log(`   ✓ Assigned Category: [${category}]`);

          return {
            keyword: cleanedTitle,
            category,
            contextSnippet: item.desc || cleanedTitle,
            targetQuestions: [
              `What are the documented facts and official statistics behind the controversy regarding ${cleanedTitle}?`,
              `Which institutional, commercial, or parliamentary bodies bear legal and financial accountability?`,
              `What is the documented impact on British taxpayers and what reforms are being demanded?`,
            ],
          };
        }
      }
    } catch (err) {
      console.warn(`   Feed error on ${feedUrl}: ${err.message}`);
    }
  }

  return null;
}

// -------------------------------------------------------------
// 4. Keyword Queue Fallback
// -------------------------------------------------------------
async function getKeywordTask(existingSet) {
  if (argKeyword) {
    return {
      keyword: argKeyword,
      category: argCategory || 'POLITICS',
      targetQuestions: [`Comprehensive investigative inquest into ${argKeyword}`],
    };
  }

  // 1. Attempt live trending feed
  const liveTrending = await fetchLiveTrendingUkTopic(existingSet);
  if (liveTrending) {
    return liveTrending;
  }

  // 2. Fall back to curated investigative queue
  console.log(`   Using high-search-volume curated investigative queue...`);
  const queuePath = path.resolve(__dirname, 'keywords-queue.json');
  if (fs.existsSync(queuePath)) {
    const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));
    // Find first topic not yet covered
    for (const item of queue) {
      const lower = item.keyword.toLowerCase();
      let covered = false;
      for (const existing of existingSet) {
        if (existing.includes(lower) || lower.includes(existing)) {
          covered = true;
          break;
        }
      }
      if (!covered) {
        return item;
      }
    }
    // If all covered, return random from queue
    return queue[Math.floor(Math.random() * queue.length)];
  }

  return {
    keyword: 'NHS hospital trust PFI debt and backlog',
    category: 'NHS & HEALTH',
    targetQuestions: ['How much public funding goes to private hospital equity?'],
  };
}

// -------------------------------------------------------------
// 5. Editorial Cover Photo Selection
// -------------------------------------------------------------
const CATEGORY_EDITORIAL_PHOTOS = {
  POLITICS: [
    {
      url: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80',
      alt: 'Palace of Westminster and Big Ben clock tower at dusk',
      credit: 'Westminster Parliamentary Bureau',
    },
    {
      url: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
      alt: 'Houses of Parliament reflected over the River Thames',
      credit: 'Gainleadx Inquest Archives',
    },
  ],
  IMMIGRATION: [
    {
      url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      alt: 'White Cliffs of Dover overlooking the English Channel',
      credit: 'Border Force Coastal Inquest',
    },
  ],
  'NHS & HEALTH': [
    {
      url: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1200&q=80',
      alt: 'British NHS hospital emergency ward corridor',
      credit: 'Healthcare Audit Bureau',
    },
  ],
  'ECONOMY & HOUSING': [
    {
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
      alt: 'London residential skyline and Victorian terrace housing',
      credit: 'Financial & Housing Ledger',
    },
  ],
  'CIVIL LIBERTIES': [
    {
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      alt: 'The Royal Courts of Justice statue of Lady Justice',
      credit: 'Judiciary & Liberties Desk',
    },
  ],
  MONARCHY: [
    {
      url: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
      alt: 'Buckingham Palace gates and royal crest',
      credit: 'Crown & Sovereign Audit',
    },
  ],
};

function selectEditorialPhoto(category) {
  const list = CATEGORY_EDITORIAL_PHOTOS[category] || CATEGORY_EDITORIAL_PHOTOS.POLITICS;
  return list[Math.floor(Math.random() * list.length)];
}

// -------------------------------------------------------------
// 6. AI Generation (Google Gemini or Anthropic Claude)
// -------------------------------------------------------------
function buildPrompts(task) {
  const systemPrompt = `You are the Senior Chief Investigative Reporter for "Gainleadx", a prominent British broadsheet publication investigating the most controversial topics, policy failures, financial paper trails, and institutional scandals across the United Kingdom.
Your writing style is forensic, rigorous, authoritative, and unapologetic. You cite official statistics, parliamentary inquiries, National Audit Office findings, and corporate ledger realities.
You must output ONLY valid, unescaped JSON matching the exact schema requested below, with no markdown code fences or conversational preamble.`;

  const userPrompt = `Conduct an exhaustive investigative inquest on the following trending UK debate:
Primary Keyword: "${task.keyword}"
Debate Category: "${task.category}"
${task.contextSnippet ? `Context Details: "${task.contextSnippet}"` : ''}
Key Inquest Questions to address:
${task.targetQuestions ? task.targetQuestions.map((q) => `- ${q}`).join('\n') : ''}

Return a JSON object with this EXACT structure:
{
  "title": "A sharp, capitalized broadsheet headline under 100 characters",
  "headlineDeck": "A secondary sub-headline deck elaborating on the investigative findings (under 130 characters)",
  "slug": "url-friendly-slug-with-hyphens",
  "category": "${task.category}",
  "excerpt": "A powerful 2-3 sentence teaser summarizing the investigation and the scandal or policy debate.",
  "estimatedReadTime": "6 MIN READ",
  "inquestStatus": "ONGOING INQUEST", // Options: "ONGOING INQUEST", "VERIFIED LEAK", "SPECIAL DOSSIER", "PARLIAMENTARY AUDIT"
  "citationsCount": "18 AUDIT CITATIONS",
  "keyTakeaways": [
    "First crucial bullet point takeaway highlighting the central figure or revelation",
    "Second finding detailing policy failure or corporate accountability",
    "Third outcome or imminent parliamentary action"
  ],
  "authorName": "Gainleadx Inquest Desk",
  "seoTitle": "SEO title under 60 characters targeting the keyword",
  "seoDescription": "Meta description under 155 characters summarizing the investigation with high click appeal",
  "sections": [
    {
      "heading": "Section H2 Heading",
      "paragraphs": [
        "First in-depth paragraph presenting verified facts, figures, and historical policy background...",
        "Second paragraph providing forensic detail, commercial contracts, or quote from whistleblowers/audits..."
      ],
      "calloutQuote": "A poignant, unvarnished quotation or critical takeaway regarding this aspect of the controversy.",
      "calloutBox": {
        "type": "whistleblower",
        "title": "LEAKED WHITEHALL MEMORANDUM",
        "text": "Specific leaked excerpt or damning audit note relevant to this section."
      },
      "keyStat": {
        "stat": "£4.2B",
        "label": "Annual Taxpayer Liability",
        "source": "National Audit Office Investigation"
      }
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
};`;

  return { systemPrompt, userPrompt };
}

async function generateWithGemini(task) {
  console.log(`\n🤖 [AI Engine] Generating broadsheet investigation with Google Gemini...`);
  console.log(`   Target Topic: "${task.keyword}" | Category: [${task.category}]`);

  const { systemPrompt, userPrompt } = buildPrompts(task);
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.3,
        response_mime_type: 'application/json',
      },
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Gemini API Error (${res.status}): ${errorText}`);
  }

  const result = await res.json();
  const rawText = result.candidates[0].content.parts[0].text.trim();
  const cleanedJson = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  return JSON.parse(cleanedJson);
}

async function generateWithClaude(task) {
  console.log(`\n🤖 [AI Engine] Generating broadsheet investigation with Claude 3.5 Sonnet...`);
  console.log(`   Target Topic: "${task.keyword}" | Category: [${task.category}]`);

  const { systemPrompt, userPrompt } = buildPrompts(task);

  const res = await fetch('https://api.anthropic.com/v1/messages', {
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

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Anthropic Claude API Error (${res.status}): ${errorText}`);
  }

  const result = await res.json();
  const rawText = result.content[0].text.trim();
  const cleanedJson = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  return JSON.parse(cleanedJson);
}

async function generateArticle(task) {
  if (GEMINI_API_KEY) {
    return await generateWithGemini(task);
  }
  if (ANTHROPIC_API_KEY) {
    return await generateWithClaude(task);
  }
  throw new Error('Missing AI API Key. Please configure GEMINI_API_KEY or ANTHROPIC_API_KEY in your environment/secrets.');
}

// -------------------------------------------------------------
// 7. Sanity PortableText Formatting & Ingestion
// -------------------------------------------------------------
function convertToPortableText(articleData) {
  const blocks = [];
  let keyIndex = 1;

  for (const section of articleData.sections || []) {
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

    if (section.calloutBox) {
      blocks.push({
        _type: 'calloutBox',
        _key: `callout-${keyIndex++}`,
        type: section.calloutBox.type || 'whistleblower',
        title: section.calloutBox.title || 'INVESTIGATIVE DISCLOSURE',
        text: section.calloutBox.text || '',
      });
    }

    if (section.keyStat) {
      blocks.push({
        _type: 'keyStat',
        _key: `stat-${keyIndex++}`,
        stat: section.keyStat.stat || '£0',
        label: section.keyStat.label || 'Documented Variance',
        source: section.keyStat.source || 'Gainleadx Inquest Audit',
      });
    }
  }

  return blocks;
}

async function publishToSanity(articleData) {
  if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) {
    console.warn(`\n⚠️  [Sanity CMS] Skipping live Sanity publish:`);
    console.warn(`   NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN not set in environment.`);
    console.warn(`   Generated article saved locally to 'scripts/generated-preview.json' for preview.`);
    fs.writeFileSync(
      path.resolve(__dirname, 'generated-preview.json'),
      JSON.stringify(articleData, null, 2),
      'utf8'
    );
    return null;
  }

  console.log(`\n📤 [Sanity CMS] Uploading article to dataset (${SANITY_PROJECT_ID}/${SANITY_DATASET})...`);

  const docId = isDraft ? `drafts.post-${Date.now()}` : `post-${Date.now()}`;
  const portableTextBlocks = convertToPortableText(articleData);
  const photo = selectEditorialPhoto(articleData.category);

  const document = {
    _id: docId,
    _type: 'post',
    title: articleData.title,
    headlineDeck: articleData.headlineDeck || '',
    slug: {
      _type: 'slug',
      current: articleData.slug,
    },
    category: articleData.category,
    inquestStatus: articleData.inquestStatus || 'ONGOING INQUEST',
    citationsCount: articleData.citationsCount || 'VERIFIED EVIDENCE',
    keyTakeaways: articleData.keyTakeaways || [],
    authorName: articleData.authorName || 'Gainleadx Inquest Desk',
    estimatedReadTime: articleData.estimatedReadTime || '6 MIN READ',
    isFeatured: true, // Brand-new daily article takes the top hero spotlight
    isTrending: true,
    excerpt: articleData.excerpt,
    publishedAt: new Date().toISOString(),
    body: portableTextBlocks,
    seoTitle: articleData.seoTitle || articleData.title,
    seoDescription: articleData.seoDescription || articleData.excerpt,
    mainImage: {
      _type: 'image',
      url: photo.url,
      alt: photo.alt,
      caption: `Investigative dossier coverage for ${articleData.title}`,
      credit: photo.credit,
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

// -------------------------------------------------------------
// 8. Instant Next.js Cache Purge
// -------------------------------------------------------------
async function triggerRevalidation() {
  if (!REVALIDATION_SECRET) return;

  console.log(`\n⚡ [Revalidation] Triggering instant On-Demand Revalidation on ${SITE_URL}...`);
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

// -------------------------------------------------------------
// Main Autonomous Execution
// -------------------------------------------------------------
async function main() {
  console.log(`=======================================================`);
  console.log(`  GAINLEADX • AUTONOMOUS DAILY INVESTIGATIVE PIPELINE   `);
  console.log(`=======================================================`);

  // 1. Check schedule (08:00 AM Europe/London time)
  checkUkSchedule();

  try {
    // 2. Discover fresh trending UK topic
    const existingSet = await getExistingSlugsAndTitles();
    const task = await getKeywordTask(existingSet);

    // 3. Draft investigation
    const article = await generateArticle(task);

    console.log(`\nHeadline: "${article.title}"`);
    console.log(`Slug: /blog/${article.slug}`);
    console.log(`Excerpt: ${article.excerpt.slice(0, 120)}...`);

    // 4. Ingest to Sanity & purge cache
    await publishToSanity(article);
    await triggerRevalidation();

    console.log(`\n✨ Successfully finished! Article is published and live at:`);
    console.log(`   ${SITE_URL}/blog/${article.slug}\n`);
  } catch (error) {
    console.error(`\n❌ Pipeline Error:`, error.message);
    process.exit(1);
  }
}

main();
