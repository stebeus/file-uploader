import { prisma } from '#root/lib/prisma.js';

export const getFile = async (req, res) => {
	const file = await prisma.file.findFirst({ where: { id: req.params.fileId } });
	res.render('file', { file });
};

export const download = async (req, res) => {
	const { name, path } = await prisma.file.findFirst({
		select: { name: true, path: true },
		where: { id: req.params.fileId },
	});

	res.download(path, name);
};
