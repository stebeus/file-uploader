import { PrismaPg } from '@prisma/adapter-pg';

import { DB_URL } from '#root/config.js';
import { PrismaClient } from '#root/generated/prisma/client.ts';

const adapter = new PrismaPg({ connectionString: DB_URL });

export const prisma = new PrismaClient({ adapter });
