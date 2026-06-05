import { defineConfig } from 'prisma/config';

import { DATABASE_URL } from './src/config.js';

export default defineConfig({
	datasource: {
		url: DATABASE_URL,
	},
	migrations: {
		path: 'prisma/migrations',
	},
	schema: 'prisma/schema.prisma',
});
