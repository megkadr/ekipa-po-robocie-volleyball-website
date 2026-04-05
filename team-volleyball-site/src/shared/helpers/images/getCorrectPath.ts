const getCorrectPath = (url: string | null) => {
	if (!url) return '';

	const base = import.meta.env.BASE_URL.endsWith('/')
		? import.meta.env.BASE_URL
		: `${import.meta.env.BASE_URL}/`;

	const path = url.startsWith('/') ? url.substring(1) : url;

	return `${base}${path}`;
};

export default getCorrectPath;