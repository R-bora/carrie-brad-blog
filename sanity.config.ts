import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset, apiVersion } from './sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'carrie_brad_editorial_studio',
  title: 'Carrie Brad Editorial Studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
  ],
});
