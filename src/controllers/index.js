import { prisma } from '#root/lib/prisma.js';

export const getIndex = async (req, res) => {
	if (req.user == null) return res.redirect('/login');

	const folders = await prisma.folder.findMany();
	const files = await prisma.file.findMany({ where: { folderId: null } });

	res.render('index', { folders, files });
};

export const getFolder = async (req, res) => {
	const { folderId } = req.params;

	const folders = await prisma.folder.findMany();
	const folder = await prisma.folder.findFirst({ where: { id: folderId } });
	const files = await prisma.file.findMany({ where: { folderId } });

	res.render('index', { folders, folder, files });
};

export const deleteFolder = async (req, res) => {
	const { folderId } = req.params;

	await prisma.folder.delete({ where: { id: folderId } });
	await prisma.file.delete({ where: { folderId } });

	res.redirect('/');
};

export const logOut = (req, res, next) => {
	req.logout((err) => err != null && next(err));
	res.redirect('/');
};
