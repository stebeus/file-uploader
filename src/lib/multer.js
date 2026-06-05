import multer from 'multer';

export const upload = multer({
	dest: 'uploads/',
	limits: {
		fileSize: 5e7, // 50 MB
	},
});
