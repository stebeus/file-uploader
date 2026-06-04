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
			{ label: 'Folder id', name: 'folderId' },
		],
		submissionLabel: 'Upload',
	});

const getUploadFile = (_req, res) => render(res);

const uploadFile = async (req, res) => {
	const {
		body: { folderId = null },
		file: { originalname, size, path },
		user: { id },
	} = req;

	const safeFolderId = folderId.trim() === '' ? null : Number(folderId);

	await prisma.upload.create({
		data: {
			name: originalname,
			size,
			userId: id,
			folderId: safeFolderId,
			destination: path,
		},
	});

	res.redirect('/');
};

export { getUploadFile, uploadFile };
