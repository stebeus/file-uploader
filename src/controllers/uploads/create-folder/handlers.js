import { prisma } from '#root/lib/prisma.js';
import { props, renderForm } from '#root/utils/form-render.js';

import { validation } from './validations.js';

const inputs = [{ label: 'Name', name: 'name', ...props }];

const render = (res, errs) =>
	renderForm(res, {
		title: 'Create folder',
		action: '/create-folder',
		errs,
		inputs,
		submissionLabel: 'Create',
	});

export const getCreateFolder = (_req, res) => render(res);

export const createFolder = [
	validation,
	async (req, res) => {
		const {
			body: { name },
			user: { id },
		} = req;

		await prisma.folder.create({ data: { name, userId: id } });

		res.redirect('/');
	},
];
