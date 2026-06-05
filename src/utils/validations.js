import { body } from 'express-validator';

export const createLengthChain = ({ fieldName, fieldLabel = fieldName, min = 1, max }) => {
	const constraint = max == null ? `have at least ${min}` : `be between ${min} and ${max}`;
	const withPlural = min > 1 || max > 1 ? 's' : '';

	return body(fieldName)
		.trim()
		.isLength({ min, max })
		.withMessage(`${fieldLabel} must ${constraint} character${withPlural}`);
};
