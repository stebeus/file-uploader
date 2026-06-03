import { renderForm } from '#root/controllers/forms/render.js';
import { prisma } from '#root/lib/prisma.js';

const render = (res, errs) =>
	renderForm(res, {
		title: 'Upload file',
		action: '/upload-file',
		errs,
		hasFileUpload: true,
		inputs: [
			{ label: 'Upload file', type: 'file', name: 'upload', isRequired: true },
		],
		submissionLabel: 'Upload',
	});

const getUploadFile = (_req, res) => render(res);

const uploadFile = async (req, res) => {
	const {
		file: { originalname, size },
		user: { id },
	} = req;

	await prisma.upload.create({
		data: { name: originalname, size, userId: id },
	});

	res.redirect('/');
};

export { getUploadFile, uploadFile };
