import passport from 'passport';

import { props, renderForm } from '#root/utils/form-render.js';

const inputs = [
	{ label: 'Email', type: 'email', name: 'email', ...props },
	{ label: 'Password', type: 'password', name: 'password', ...props },
];

export const getLogin = ({ session: { messages } }, res) =>
	renderForm(res, {
		title: 'Login',
		action: '/login',
		errs: messages,
		inputs,
		submissionLabel: 'Log in',
	});

export const logIn = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureMessage: 'Incorrect email or password',
});
