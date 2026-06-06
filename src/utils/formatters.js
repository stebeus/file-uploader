export const formatDate = (date) => {
	const options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	};

	return date.toLocaleString('en-US', options);
};
