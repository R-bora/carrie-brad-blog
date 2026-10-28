import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset, apiVersion } from './sanity/env';

export default defineConfig({
  basePath: '/studio',
  name: 'gainleadx_editorial_studio',
  title: 'Gainleadx Editorial Studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
  ],
});
