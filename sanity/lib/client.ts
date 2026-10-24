import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
});

// Helper to determine if actual Sanity credentials are provided
export const isSanityConfigured = () => {
  return (
    projectId &&
    projectId !== 'demo-project-id' &&
    projectId !== 'your-project-id'
  );
};
