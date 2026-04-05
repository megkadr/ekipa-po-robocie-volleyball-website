export default function createPlayerSlug(firstName: string, lastName: string, number: number): string {
	const normalize = (str: string) =>
		str
			.toLowerCase()
			.replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e')
			.replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o')
			.replace(/ś/g, 's').replace(/ź/g, 'z').replace(/ż/g, 'z')
			.replace(/[^a-z0-9]/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '');

	return `${normalize(firstName)}-${normalize(lastName)}-${number}`;
}