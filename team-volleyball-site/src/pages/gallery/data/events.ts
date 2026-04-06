import type { GalleryEvent } from '../types/galleryTypes';

/**
 * Lista wszystkich wydarzeń z galerią zdjęć.
 *
 * Jak dodać nowe wydarzenie:
 * 1. Utwórz folder w public/assets/images/gallery/{slug}/
 * 2. Wrzuć zdjęcia .webp do tego folderu (nazwa dowolna, np. img-001.webp)
 * 3. Dodaj wpis poniżej z wypełnionymi photos[]
 *
 * Slug = nazwa folderu = {nazwa-wydarzenia}-{rok}-{miesiac-2cyfry}
 */
export const galleryEvents: GalleryEvent[] = [
	{
		slug: 'tłustoczwartkowy-turniej-piłki-siatkowej-2026-02-12',
		name: 'XIV Tłustoczwartkowy Turniej Piłki Siatkowej',
		location: 'Tereszewo',
		date: '2026-02-12',
		type: 'turniej',
		photos: [
			{ path: 'assets/images/gallery/tłustoczwartkowy-turniej-piłki-siatkowej-2026-02-12/img-001.webp', caption: 'Drużyna nie pełna' },
			{ path: 'assets/images/gallery/tłustoczwartkowy-turniej-piłki-siatkowej-2026-02-12/img-002.webp' },
			{ path: 'assets/images/gallery/tłustoczwartkowy-turniej-piłki-siatkowej-2026-02-12/img-003.webp' },
			{ path: 'assets/images/gallery/tłustoczwartkowy-turniej-piłki-siatkowej-2026-02-12/img-004.webp' },
		],
	},
];