import { body } from 'express-validator';

import { createLengthChain } from '#root/controllers/forms/validations.js';
import { prisma } from '#root/lib/prisma.js';

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
		.withMessage(
			`${fieldLabel} must contain only ${charConstraint} characters`,
		);
};

const fullName = createNameChain({
	fieldName: 'fullName',
	fieldLabel: 'full name',
	ignore: ' ',
	max: 100,
});

const isUsernameTaken = async (username) => {
	const isUsernameTaken = await prisma.user.findUnique({ where: { username } });
	if (isUsernameTaken) throw new Error('username has been taken');
};

const username = createNameChain({
	fieldName: 'username',
	charFn: 'isAlphanumeric',
	ignore: '_',
	max: 25,
}).custom(isUsernameTaken);

const password = createLengthChain({ fieldName: 'password', max: 100 });

const matchPasswords = (value, { req }) => value === req.body.password;

const passwordConfirmation = body('passwordConfirmation')
	.custom(matchPasswords)
	.withMessage('passwords must match');

export const validations = [fullName, username, password, passwordConfirmation];
