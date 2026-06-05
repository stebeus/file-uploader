import { prisma } from '#root/lib/prisma.js';
import { renderForm } from '#root/utils/form-render.js';

const inputs = [
	{
		label: 'File',
		type: 'file',
		name: 'file',
		isRequired: true,
		helperText: 'Maximum size: 50 MB',
	},
];

const render = ({ params: { folderId = '' } }, res, errs) =>
	renderForm(res, {
		title: 'Upload file',
		action: `/upload/${folderId}`,
		errs,
		hasUpload: true,
		inputs,
		submissionLabel: 'Upload',
	});

export const getUpload = (req, res) => render(req, res);

export const upload = async (req, res) => {
	const {
		params: { folderId },
		file: { originalname, size, path },
		user: { id },
	} = req;

	await prisma.upload.create({ data: { name: originalname, size, userId: id, folderId, path } });

	res.redirect('/');
};
