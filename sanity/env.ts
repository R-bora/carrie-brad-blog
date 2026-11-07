export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';

function sanitizeDataset(val?: string): string {
  if (!val) return 'production';
  const clean = val.trim().replace(/^["']|["']$/g, '');
  if (/^[a-z0-9~_-]+$/.test(clean) && clean.length <= 64) {
    return clean;
  }
  return 'production';
}

function sanitizeProjectId(val?: string): string {
  if (!val) return '7vlmtiag';
  const clean = val.trim().replace(/^["']|["']$/g, '');
  if (/^[a-z0-9-]+$/.test(clean) && clean.length <= 32) {
    return clean;
  }
  return '7vlmtiag';
}

export const dataset = sanitizeDataset(process.env.NEXT_PUBLIC_SANITY_DATASET);
export const projectId = sanitizeProjectId(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

export const useCdn = false;
