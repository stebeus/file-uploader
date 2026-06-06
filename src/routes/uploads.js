import { Router } from 'express';

import { createFolder, getCreateFolder } from '#root/controllers/upload/create-folder/handlers.js';
import { editFolder, getEditFolder } from '#root/controllers/upload/edit-folder/handlers.js';
import { getUpload, uploadFile } from '#root/controllers/upload/upload.js';
import { upload } from '#root/lib/multer.js';

export const uploads = Router();

uploads.get('/create-folder', getCreateFolder);
uploads.post('/create-folder', createFolder);

uploads.get('/edit-folder', getEditFolder);
uploads.post('/edit-folder', editFolder);

uploads.get('/upload/', getUpload);
uploads.get('/upload/folder/:folderId', getUpload);
uploads.post('/upload/', upload.single('file'), uploadFile);
uploads.post('/upload/folder/:folderId', upload.single('file'), uploadFile);
