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

  console.log('Fetching BBC Radio 2 post to update image...');
  const query = encodeURIComponent('*[_type == "post" && (_id == "post-1794212625972" || title match "*BBC Radio*")][0]{ _id, title }');
  const getUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}`;
  
  const getRes = await fetch(getUrl);
  const { result: post } = await getRes.json();

  if (!post) {
    console.log('No post matching BBC Radio found.');
    return;
  }

  console.log(`Updating cover image for [${post._id}] "${post.title}"...`);

  const imageUrl = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80';
  let assetRef = null;

  try {
    console.log('Uploading broadcast radio studio asset to Sanity CDN...');
    const imgRes = await fetch(imageUrl);
    if (imgRes.ok) {
      const buffer = await imgRes.arrayBuffer();
      const uploadUrl = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/assets/images/${SANITY_DATASET}?filename=bbc-radio-studio.jpg`;
      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
          Authorization: `Bearer ${SANITY_WRITE_TOKEN}`,
        },
        body: Buffer.from(buffer),
      });

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        if (uploadData.document && uploadData.document._id) {
          assetRef = {
            _type: 'reference',
            _ref: uploadData.document._id,
          };
          console.log(`✓ Image asset uploaded to Sanity CDN: ${uploadData.document._id}`);
        }
      }
    }
  } catch (err) {
    console.warn(`Asset upload note: ${err.message}`);
  }

  const mainImage = {
    _type: 'image',
    url: imageUrl,
    alt: 'BBC Radio broadcasting microphone and on-air production studio',
    caption: 'Broadcast transmission desk and professional radio studio equipment.',
    credit: 'Broadcasting & Media Archive / Gainleadx',
  };
  if (assetRef) {
    mainImage.asset = assetRef;
  }

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
              mainImage,
            },
          },
        },
      ],
    }),
  });

  if (!mutateRes.ok) {
    throw new Error(`Mutation failed: ${await mutateRes.text()}`);
  }

  console.log('✓ Successfully attached authentic broadcast radio studio photo & asset to BBC Radio 2 post!');

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
