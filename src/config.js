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
	SUPABASE_PUBLISHABLE_KEY,
	SUPABASE_URL,
} = env;
