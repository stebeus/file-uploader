import { matchedData, validationResult } from 'express-validator';

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
		const errs = validationResult(req);
		if (!errs.isEmpty()) return render(res, errs.array());

		const { name } = matchedData(req);
		const { id } = req.user;

		await prisma.folder.create({ data: { name, userId: id } });

		res.redirect('/');
	},
];
