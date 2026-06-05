import { Router } from 'express';

import { deleteFolder, getFolder, getIndex, logOut } from '#root/controllers/index.js';

export const index = Router();

index.get('/', getIndex);

index.get('/folder/:folderId/', getFolder);
index.get('/delete-folder/:folderId', deleteFolder);

index.get('/logout', logOut);
