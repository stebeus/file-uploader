import { Router } from 'express';

import { getLogIn, logIn } from '#root/controllers/forms/log-in.js';
import { getSignUp, signUp } from '#root/controllers/forms/sign-up/handler.js';

const router = Router();

router.get('/log-in', getLogIn);
router.get('/sign-up', getSignUp);

router.post('/log-in', logIn);
router.post('/sign-up', signUp);

export { router as forms };
