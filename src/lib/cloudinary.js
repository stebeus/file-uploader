import { v2 } from 'cloudinary';

import { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } from '#root/configuration.js';

export const cloudinary = v2;

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_SECRET,
});
