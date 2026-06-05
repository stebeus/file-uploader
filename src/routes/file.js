import { Router } from 'express';

import { download, getFile } from '#root/controllers/file.js';

export const file = Router();

file.get('{*splat}/file/:fileId', getFile);
file.get('/download/:fileId', download);
