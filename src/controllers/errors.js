import { constants } from 'node:http2';

import createHttpError from 'http-errors';

const { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

const handleNotFoundError = (_req, _res, next) => next(createHttpError(HTTP_STATUS_NOT_FOUND));

const handleError = (err, req, res, next) => {
	if (res.headersSent) return next(err);

	const { status = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
	const nodeEnv = req.app.get('env');

	req.log.error(err);

	res.status(status).render('error', { title: `${status}: ${message}`, err, nodeEnv });
};

export { handleError, handleNotFoundError };
