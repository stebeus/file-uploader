export const setAppName = (_req, res, next) => {
	res.locals.appName = 'File Uploader';
	next();
};
