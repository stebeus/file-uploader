import { Router } from 'express';

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

router.post('/log-in', logIn);
router.post('/sign-up', signUp);
router.post('/upload-file', upload.single('upload'), uploadFile);

export { router as forms };
