import { body } from 'express-validator';

import { pool, prisma } from '#root/lib/prisma.js';
import { createLengthChain } from '#root/utils/validations.js';

const createNameChain = ({
	fieldName,
	fieldLabel = fieldName,
	charFn = 'isAlpha',
	ignore,
	min,
	max,
}) => {
	const charConstraint = charFn === 'isAlpha' ? 'alphabetic' : 'alphanumeric';

	return createLengthChain({ fieldName, fieldLabel, min, max })
		[charFn]('en-US', { ignore })
		.withMessage(`${fieldLabel} must contain only ${charConstraint} characters`);
};

const name = createNameChain({ fieldName: 'name', fieldLabel: 'Full name', ignore: ' ', max: 100 });

const email = createLengthChain({ fieldName: 'email' })
	.isEmail()
	.withMessage('Must be a valid email address');

const password = createLengthChain({ fieldName: 'password' });

const matchPasswords = (value, { req }) => value === req.body.password;

const passwordConfirmation = body('passwordConfirmation')
	.custom(matchPasswords)
	.withMessage('Passwords must match');

export const validations = [name, email, password, passwordConfirmation];
