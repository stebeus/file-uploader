import { constants } from 'node:http2';

const { HTTP_STATUS_CREATED, HTTP_STATUS_BAD_REQUEST } = constants;

export const props = { autocomplete: 'on', isRequired: true };

export const renderForm = (res, { title, action, errs, hasUpload, inputs, submissionLabel }) => {
	const status = errs == null ? HTTP_STATUS_CREATED : HTTP_STATUS_BAD_REQUEST;
	res.status(status).render('form', { title, action, errs, hasUpload, inputs, submissionLabel });
};
