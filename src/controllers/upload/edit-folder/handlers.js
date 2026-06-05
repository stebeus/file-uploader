import { prisma } from '#root/lib/prisma.js';
import { props, renderForm } from '#root/utils/form-render.js';

import { validation } from './validations.js';

const render = ({ folderId }, res, value, errs) =>
	renderForm(res, {
		title: 'Edit folder',
		action: `/edit-folder/${folderId}`,
		errs,
		inputs: [{ label: 'Name', name: 'name', value, ...props }],
		submissionLabel: 'Save changes',
	});

export const getEditFolder = async (req, res) => {
	const { folderId } = req.params;

	const { name } = await prisma.folder.findFirst({
		select: { name: true },
		where: { id: folderId },
	});

	render(req, res, name);
};

export const editFolder = [
	validation,
	async (req, res) => {
		const {
			body: { name },
			params: { folderId },
		} = req;

		await prisma.folder.update({ where: { id: folderId }, data: { name } });

		res.redirect(`/folder/${folderId}`);
	},
];
