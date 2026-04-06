import type { GalleryEvent } from '../types/galleryTypes';

// ─── Grupowanie ───────────────────────────────────────────────────────────────

export interface MonthGroup {
	/** Numer miesiąca 1–12 */
	month: number;
	monthLabel: string;
	events: GalleryEvent[];
}

export interface YearGroup {
	year: number;
	months: MonthGroup[];
}

const MONTH_NAMES_PL = [
	'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
	'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień',
];

/** Grupuje wydarzenia według roku a wewnątrz roku według miesiąca, sortuje malejąco */
export function groupEventsByYearAndMonth(events: GalleryEvent[]): YearGroup[] {
	const map = new Map<number, Map<number, GalleryEvent[]>>();

	for (const event of events) {
		const date  = new Date(event.date);
		const year  = date.getFullYear();
		const month = date.getMonth() + 1; // 1-based

		if (!map.has(year)) map.set(year, new Map());
		const yearMap = map.get(year)!;
		if (!yearMap.has(month)) yearMap.set(month, []);
		yearMap.get(month)!.push(event);
	}

	const yearGroups: YearGroup[] = [];

	for (const [year, monthMap] of map) {
		const months: MonthGroup[] = [];

		for (const [month, monthEvents] of monthMap) {
			months.push({
				month,
				monthLabel: MONTH_NAMES_PL[month - 1]!,
				// Sortuj wydarzenia w miesiącu chronologicznie
				events: [...monthEvents].sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
				),
			});
		}

		yearGroups.push({
			year,
			// Sortuj miesiące chronologicznie
			months: months.sort((a, b) => a.month - b.month),
		});
	}

	// Najnowsze lata na górze
	return yearGroups.sort((a, b) => b.year - a.year);
}

// ─── Formatowanie dat ─────────────────────────────────────────────────────────

export function formatEventDate(isoDate: string): string {
	const date = new Date(isoDate);
	return date.toLocaleDateString('pl-PL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

export function getEventYear(isoDate: string): number {
	return new Date(isoDate).getFullYear();
}

export function getEventMonth(isoDate: string): number {
	return new Date(isoDate).getMonth() + 1;
}

// ─── Ścieżki zdjęć ────────────────────────────────────────────────────────────

/**
 * Zwraca poprawną ścieżkę do zdjęcia uwzględniając BASE_URL (GitHub Pages).
 * Przyjmuje ścieżkę względem /public, np. "images/gallery/event/img-001.webp"
 */
export function resolvePhotoPath(path: string): string {
	const base = import.meta.env.BASE_URL.endsWith('/')
		? import.meta.env.BASE_URL
		: `${import.meta.env.BASE_URL}/`;

	const cleanPath = path.startsWith('/') ? path.substring(1) : path;
	return `${base}${cleanPath}`;
}

/**
 * Nazwa pliku do pobrania — wyciąga ostatni segment ścieżki
 * "images/gallery/event/img-001.webp" → "img-001.webp"
 */
export function getPhotoFilename(path: string): string {
	return path.split('/').pop() ?? 'zdjecie.webp';
}

// ─── Typy wydarzeń ────────────────────────────────────────────────────────────

export const eventTypeLabels: Record<string, string> = {
	turniej: 'Turniej',
	liga:    'Liga',
};

export const eventTypeColors: Record<string, string> = {
	turniej: '#4f8ef7',
	liga:    '#f75f4f',
};