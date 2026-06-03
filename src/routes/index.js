import { Router } from 'express';

import { deleteFolder, getFolder, getIndex } from '#root/controllers/index.js';

const router = Router();

router.get('/', getIndex);
router.get('/folder/:folderId/', getFolder);
router.get('/delete-folder/:folderId', deleteFolder);

export { router as index };
