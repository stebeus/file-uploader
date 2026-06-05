export const setAppName = (_req, res, next) => {
	res.locals.appName = 'File Uploader';
	next();
};

export const parseParamIds = (req, _res, next) => {
	for (const param of Object.values(req.params)) Number(param);
	next();
};
