import { constants } from 'node:http2';

import createHttpError from 'http-errors';

import { prisma } from '#root/lib/prisma.js';
import { supabase } from '#root/lib/supabase.js';
import { renderForm } from '#root/utils/form-render.js';

const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

const inputs = [
	{
		label: 'File',
		type: 'file',
		name: 'file',
		isRequired: true,
		helperText: 'Maximum size: 50 MB',
	},
];

const render = ({ params: { folderId } }, res, errs) =>
	renderForm(res, {
		title: 'Upload file',
		action: `/upload/${folderId == null ? '' : `folder/${folderId}`}`,
		errs,
		hasUpload: true,
		inputs,
		submissionLabel: 'Upload',
	});

export const getUpload = (req, res) => render(req, res);

export const uploadFile = async (req, res, next) => {
	const {
		file: { buffer, mimetype, originalname, size },
		user: { id },
	} = req;

	const rawFolderId = req.params.folderId;
	const folder = rawFolderId == null ? '' : `${rawFolderId}/`;
	const date = new Date().toISOString();

	const path = `${id}/${folder}${date}_${originalname}`;

	const { error } = await supabase.storage
		.from('files')
		.upload(path, buffer, { contentType: mimetype });

	if (error != null) return next(createHttpError(HTTP_STATUS_INTERNAL_SERVER_ERROR, error.message));

	const folderId = Number(rawFolderId);
	await prisma.file.create({ data: { name: originalname, size, userId: id, folderId, path } });

	res.redirect('/');
};
