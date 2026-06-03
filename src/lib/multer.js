import multer from 'multer';

import { UPLOAD_DEST } from '#root/config.js';

export const upload = multer({
	dest: UPLOAD_DEST,
	limits: {
		fileSize: 1e9, // 1 GB
	},
});
