import { Router } from 'express';

import {
	deleteFolder,
	download,
	getFolder,
	getIndex,
	getUpload,
} from '#root/controllers/index.js';

const router = Router();

router.get('/', getIndex);
router.get('/folder/:folderId/', getFolder);
router.get('/delete-folder/:folderId', deleteFolder);
router.get('{*splat}/upload/:uploadId', getUpload);
router.get('/download/:uploadId', download);

export { router as index };
