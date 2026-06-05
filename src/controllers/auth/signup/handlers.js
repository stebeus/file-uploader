import { hash } from 'bcryptjs';
import { matchedData, validationResult } from 'express-validator';

import { prisma } from '#root/lib/prisma.js';
import { props, renderForm } from '#root/utils/form-render.js';

import { validations } from './validations.js';

const inputs = [
	{ label: 'Full name', name: 'name', placeholder: 'John Doe', maxLength: 100, ...props },
	{ label: 'Email', type: 'email', name: 'email', placeholder: 'john@doe.com', ...props },
	{ label: 'Password', type: 'password', name: 'password', ...props },
	{ label: 'Confirm password', type: 'password', name: 'passwordConfirmation', ...props },
];

const render = (res, errs) =>
	renderForm(res, {
		title: 'Create account',
		action: '/signup',
		errs,
		inputs,
		submissionLabel: 'Sign up',
	});

export const getSignup = (_req, res) => render(res);

export const signUp = [
	validations,
	async (req, res) => {
		const errs = validationResult(req);
		if (!errs.isEmpty()) return render(res, errs.array());

		const { email, name, password } = matchedData(req);
		const hashedPassword = await hash(password, 10);

		await prisma.user.create({ data: { email, name, password: hashedPassword } });

		res.redirect('/login');
	},
];
