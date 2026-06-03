import { hash } from 'bcryptjs';
import { matchedData, validationResult } from 'express-validator';

import { props, renderForm } from '#root/controllers/forms/render.js';
import { prisma } from '#root/lib/prisma.js';

import { validations } from './validations.js';

const inputs = [
	{
		label: 'Full name',
		name: 'fullName',
		placeholder: 'John Doe',
		maxLength: 100,
		...props,
	},
	{
		label: 'Username',
		name: 'username',
		placeholder: 'john_doe123',
		maxLength: 25,
		helperText: 'Maximum characters: 25',
		...props,
	},
	{
		label: 'Password',
		name: 'password',
		type: 'password',
		maxLength: 100,
		...props,
	},
	{
		label: 'Confirm password',
		name: 'passwordConfirmation',
		type: 'password',
		maxLength: 100,
		...props,
	},
];

const render = (res, errs) =>
	renderForm(res, {
		title: 'Sign up',
		action: '/sign-up',
		errs,
		inputs,
		submissionLabel: 'Sign up',
	});

const getSignUp = (_req, res) => render(res);

const signUp = [
	validations,
	async (req, res) => {
		const errs = validationResult(req);
		if (!errs.isEmpty()) return render(res, errs.array());

		const { fullName, username, password } = matchedData(req);
		const hashedPassword = await hash(password, 10);

		await prisma.user.create({
			data: { fullName, username, password: hashedPassword },
		});

		res.redirect('/log-in');
	},
];

export { getSignUp, signUp };
