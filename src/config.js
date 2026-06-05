import { env, loadEnvFile } from 'node:process';

try {
	loadEnvFile();
} catch (err) {
	if (err.code !== 'ENOENT') throw err;
}

export const {
	DATABASE_URL,
	PORT = 3000,
	SESSION_SECRET,
	CLOUDINARY_API_KEY,
	CLOUD_NAME,
	CLOUDINARY_SECRET,
} = env;
