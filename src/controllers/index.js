import { prisma } from '#root/lib/prisma.js';

const getIndex = async (req, res) => {
	const folders = await prisma.folder.findMany();
	res.render('index', { folders });
};

const getFolder = async (req, res) => {
	const folders = await prisma.folder.findMany();

	const folder = await prisma.folder.findFirst({
		where: { id: Number(req.params.folderId) },
	});

	res.render('index', { folder, folders });
};

const deleteFolder = async (req, res) => {
	await prisma.folder.delete({ where: { id: Number(req.params.folderId) } });
	res.redirect('/');
};

export { deleteFolder, getFolder, getIndex };
