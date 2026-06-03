import { props, renderForm } from '#root/controllers/forms/render.js';
import { prisma } from '#root/lib/prisma.js';

const render = (res, errs) =>
	renderForm(res, {
		title: 'Create folder',
		action: '/create-folder',
		errs,
		inputs: [{ label: 'Name', name: 'name', ...props }],
		submissionLabel: 'Create',
	});

const getCreateFolder = (_req, res) => render(res);

const createFolder = async (req, res) => {
	const {
		body: { name },
		user: { id },
	} = req;

	await prisma.folder.create({ data: { name, userId: id } });

	res.redirect('/');
};

export { createFolder, getCreateFolder };
