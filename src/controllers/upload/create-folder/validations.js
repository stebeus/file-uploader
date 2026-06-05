import { createLengthChain } from '#root/utils/validations.js';

export const validation = createLengthChain({
	fieldName: 'name',
	max: 50,
	helperText: 'Maximum characters: 50',
});
