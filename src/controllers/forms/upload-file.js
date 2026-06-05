import { renderForm } from '#root/controllers/forms/render.js';
import { cloudinary } from '#root/lib/cloudinary.js';
import { prisma } from '#root/lib/prisma.js';

const render = (req, res, errs) =>
	renderForm(res, {
		title: 'Upload file',
		action: `/upload-file/${req.params.folderId ?? ''}`,
		errs,
		hasFileUpload: true,
		inputs: [{ label: 'File', type: 'file', name: 'upload', isRequired: true }],
		submissionLabel: 'Upload',
	});

const getUploadFile = (req, res) => render(req, res);

const uploadFile = async (req, res) => {
	const {
		params: { folderId },
		file: { originalname, size, path },
		user: { id },
	} = req;

	const safeFolderId = folderId === '' ? null : Number(folderId);

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
