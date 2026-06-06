import { constants } from 'node:http2';

import createHttpError from 'http-errors';

import { prisma } from '#root/lib/prisma.js';
import { supabase } from '#root/lib/supabase.js';

const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export const getFile = async (req, res) => {
	const fileId = Number(req.params.fileId);
	const file = await prisma.file.findFirst({ where: { id: fileId } });
	res.render('file', { file });
};

export const download = async (req, res, next) => {
	const fileId = Number(req.params.fileId);

	const { name, path } = await prisma.file.findFirst({
		select: { name: true, path: true },
		where: { id: fileId },
	});

	const { data, error } = await supabase.storage
		.from('files')
		.getPublicUrl(path, { download: true });

	if (error != null) return next(createHttpError(HTTP_STATUS_INTERNAL_SERVER_ERROR, error.message));

	res.redirect(`${data.publicUrl}${name}`); // Use name to get the original file name
};
