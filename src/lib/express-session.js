import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';

import { SESSION_SECRET } from '#root/config.js';

import { prisma } from './prisma.js';

const sessionAge = 90 * 24 * 60 * 60 * 1000; // 3 months

const store = new PrismaSessionStore(prisma, {
	checkPeriod: sessionAge,
	dbRecordIdIsSessionId: true,
});

export const expressSession = session({
	cookie: {
		maxAge: sessionAge,
	},
	resave: false,
	saveUninitialized: false,
	secret: SESSION_SECRET,
	store,
});
