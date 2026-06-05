import { join } from 'node:path';

import express from 'express';
import passport from 'passport';

import { PORT } from './config.js';
import { handleError, handleNotFoundError } from './controllers/errors.js';
import { setCurrentUser } from './lib/auth.js';
import { logger, pino } from './lib/logger.js';
import { session } from './lib/session.js';
import { parseParamIds, setAppName } from './middleware.js';
import { router } from './routes/router.js';

const app = express();
const viewsPath = join(import.meta.dirname, 'views');

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(pino);

app.use(session);
app.use(passport.session());
app.use(setCurrentUser);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(setAppName);
app.use(parseParamIds);

app.use(router);

app.use(handleNotFoundError);
app.use(handleError);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
