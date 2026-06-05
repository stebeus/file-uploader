import { Router } from 'express';

import { auth } from './auth.js';
import { file } from './file.js';
import { index } from './index.js';
import { uploads } from './uploads.js';

export const router = Router();

const routes = [index, auth, file, uploads];

for (const route of routes) {
	router.use(route);
}
