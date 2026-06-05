import { pinoHttp } from 'pino-http';

export const pino = pinoHttp({
	level: 'debug',
	serializers: {
		req: ({ method, url }) => ({ method, url }),
		res: ({ statusCode }) => ({ statusCode }),
	},
	transport: {
		target: 'pino-pretty',
	},
});

export const { logger } = pino;
