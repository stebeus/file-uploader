import multer from 'multer';

export const upload = multer({
	limits: {
		fileSize: 5e7, // 50 MB
	},
});
