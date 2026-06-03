const props = { autocomplete: 'on', isRequired: true };

const renderForm = (
	res,
	{ title, action, errs, inputs, hasTextarea, textarea, submissionLabel },
) => {
	const status = errs == null ? 201 : 400;

	res.status(status).render('form', {
		title,
		action,
		errs,
		inputs,
		hasTextarea,
		textarea,
		submissionLabel,
	});
};

export { props, renderForm };
