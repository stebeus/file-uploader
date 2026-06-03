import { props, renderForm } from '#root/controllers/forms/render.js';
import { prisma } from '#root/lib/prisma.js';

const render = (res, folderId, value, errs) =>
	renderForm(res, {
		title: 'Edit folder',
		action: `/edit-folder/${folderId}`,
		errs,
		inputs: [{ label: 'Name', name: 'name', value, ...props }],
		submissionLabel: 'Save changes',
	});

const getEditFolder = async (req, res) => {
	const { folderId } = req.params;

	const { name } = await prisma.folder.findFirst({
		select: { name: true },
		where: { id: Number(folderId) },
	});

	render(res, folderId, name);
};

const editFolder = async (req, res) => {
	const {
		body: { name },
		params: { folderId },
	} = req;

	await prisma.folder.update({
		where: { id: Number(folderId) },
		data: { name },
	});

	res.redirect('/');
};

export { editFolder, getEditFolder };
