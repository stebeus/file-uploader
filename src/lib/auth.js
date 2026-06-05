import { compare } from 'bcryptjs';
import passport from 'passport';
import { Strategy } from 'passport-local';

import { prisma } from './prisma.js';

const verify = async (email, password, done) => {
	try {
		const user = await prisma.user.findFirst({ where: { email } });

		if (user == null) {
			return done(null, false, { message: 'Incorrect email' });
		}

		const isMatch = await compare(password, user.password);

		if (!isMatch) {
			return done(null, false, { message: 'Incorrect password' });
		}

		return done(null, user);
	} catch (err) {
		return done(err);
	}
};

passport.use(new Strategy({ usernameField: 'email' }, verify));

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = await prisma.user.findFirst({ where: { id } });
		done(null, user);
	} catch (err) {
		done(err);
	}
});

const setCurrentUser = (req, res, next) => {
	res.locals.user = req.user;
	next();
};

export { setCurrentUser };
