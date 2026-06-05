import { env, loadEnvFile } from 'node:process';

try {
	loadEnvFile();
} catch (err) {
	if (err.code !== 'ENOENT') throw err;
}

export const {
	DB_URL,
	PORT = 3000,
	SESSION_SECRET,
	UPLOAD_DEST,
	CLOUDINARY_KEY,
	CLOUDINARY_SECRET,
} = env;
