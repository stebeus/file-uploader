import { equal } from 'node:assert/strict';
import { describe, it } from 'node:test';

import { formatDate } from '#root/utils/formatters.js';

describe('formatDate', () => {
	it('formats dates that are human readable', () => {
		equal(formatDate(new Date(2000, 1, 1, 13, 9)), '2/1/2000, 1:09 PM');
	});
});
