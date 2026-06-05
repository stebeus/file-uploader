import { v2 } from 'cloudinary';

import { CLOUDINARY_KEY, CLOUDINARY_SECRET } from '#root/config.js';

export const cloudinary = v2;

cloudinary.config({
	cloud_name: 'ds6gsl6tz',
	api_key: CLOUDINARY_KEY,
	api_secret: CLOUDINARY_SECRET,
});
