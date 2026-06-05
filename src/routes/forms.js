import { Router } from 'express';

import {
	createFolder,
	getCreateFolder,
} from '#root/controllers/forms/create-folder.js';
import {
	editFolder,
	getEditFolder,
} from '#root/controllers/forms/edit-folder.js';
import { getLogIn, logIn } from '#root/controllers/forms/log-in.js';
import { getSignUp, signUp } from '#root/controllers/forms/sign-up/handler.js';
import {
	getUploadFile,
	uploadFile,
} from '#root/controllers/forms/upload-file.js';
import { upload } from '#root/lib/multer.js';

const router = Router();

router.get('/log-in', getLogIn);
router.get('/sign-up', getSignUp);
router.get('/upload-file', getUploadFile);
router.get('/upload-file/folder/:folderId', getUploadFile);
router.get('/create-folder', getCreateFolder);
router.get('/edit-folder/:folderId', getEditFolder);

router.post('/log-in', logIn);
router.post('/sign-up', signUp);
router.post('/upload-file/', upload.single('upload'), uploadFile);
router.post('/upload-file/:folderId', upload.single('upload'), uploadFile);
router.post('/create-folder', createFolder);
router.post('/edit-folder/:folderId', editFolder);

export { router as forms };
