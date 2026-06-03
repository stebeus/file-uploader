import { defineConfig } from 'prisma/config';

import { DB_URL } from '#root/config.js';

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
	},
	datasource: {
		url: DB_URL,
	},
});
