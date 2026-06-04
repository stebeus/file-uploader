import { prisma } from '#root/lib/prisma.js';

const getIndex = async (req, res) => {
	const folders = await prisma.folder.findMany();
	const uploads = await prisma.upload.findMany({ where: { folderId: null } });
	res.render('index', { folders, uploads });
};

const getFolder = async (req, res) => {
	const { folderId } = req.params;

	const folders = await prisma.folder.findMany();

	const folder = await prisma.folder.findFirst({
		where: { id: Number(folderId) },
	});

	const uploads = await prisma.upload.findMany({
		where: { folderId: Number(folderId) },
	});

	res.render('index', { folder, folders, uploads });
};

const deleteFolder = async (req, res) => {
	await prisma.folder.delete({ where: { id: Number(req.params.folderId) } });
	res.redirect('/');
};

const getUpload = async (req, res) => {
	const upload = await prisma.upload.findFirst({
		where: { id: Number(req.params.uploadId) },
	});

	res.render('upload', { upload });
};

const download = async (req, res) => {
	const { destination, name } = await prisma.upload.findFirst({
		select: { name: true, destination: true },
		where: { id: Number(req.params.uploadId) },
	});

	res.download(destination, name);
};

export { deleteFolder, download, getFolder, getIndex, getUpload };
