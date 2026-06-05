import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import expressSession from 'express-session';

import { SESSION_SECRET } from '#root/config.js';

import { prisma } from './prisma.js';

const store = new PrismaSessionStore(prisma, {
	checkPeriod: 60 * 60 * 1000,
	dbRecordIdIsSessionId: true,
});

export const session = expressSession({
	cookie: {
		maxAge: 182 * 24 * 60 * 60 * 1000, // 6 months
	},
	resave: false,
	saveUninitialized: false,
	secret: SESSION_SECRET,
	store,
});
