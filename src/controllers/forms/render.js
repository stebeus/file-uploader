const props = { autocomplete: 'on', isRequired: true };

const renderForm = (
	res,
	{ title, action, errs, hasFileUpload, inputs, submissionLabel },
) => {
	const status = errs == null ? 201 : 400;

	res.status(status).render('form', {
		title,
		action,
		errs,
		hasFileUpload,
		inputs,
		submissionLabel,
	});
};

export { props, renderForm };
