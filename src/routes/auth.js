import { Router } from 'express';

import { getLogin, logIn } from '#root/controllers/auth/login.js';
import { getSignup, signUp } from '#root/controllers/auth/signup/handlers.js';

export const auth = Router();

auth.get('/login', getLogin);
auth.post('/login', logIn);

auth.get('/signup', getSignup);
auth.post('/signup', signUp);
