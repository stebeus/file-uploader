import createHttpError from 'http-errors';

const handleNotFoundError = (_req, _res, next) => next(createHttpError(404));

const handleError = (err, req, res, next) => {
	if (res.headersSent) return next(err);

	const { status = 500, message } = err;
	const nodeEnv = req.app.get('env');

	req.log.error(err);

	res
		.status(status)
		.render('error', { title: `${status} - ${message}`, err, nodeEnv });
};

export { handleError, handleNotFoundError };
