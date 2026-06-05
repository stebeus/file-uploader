import multer from 'multer';

export const upload = multer({
	dest: 'uploads/',
	limits: {
		fileSize: 1e9, // 1 GB
	},
});
