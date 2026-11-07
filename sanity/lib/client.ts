import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';

// Helper to determine if actual Sanity credentials are provided
export const isSanityConfigured = () => {
  return (
    Boolean(projectId) &&
    /^[a-z0-9-]+$/.test(projectId) &&
    projectId !== 'demo-project-id' &&
    projectId !== 'your-project-id'
  );
};

export const client: SanityClient = createClient({
  projectId: projectId || '7vlmtiag',
  dataset: dataset || 'production',
  apiVersion,
  useCdn,
  perspective: 'published',
});
