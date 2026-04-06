export type EventType = 'turniej' | 'liga';

export interface GalleryPhoto {
	path: string;
	caption?: string;
}

export interface GalleryEvent {
	/**
	 * Unikalny slug folderu — musi pasować do nazwy folderu w public/images/gallery/
	 * Format: {nazwa}-{rok}-{miesiac-2cyfry}
	 * Przykład: "bals-biskupiec-2024-03"
	 */
	slug: string;
	name: string;
	location: string;
	date: string;
	type: EventType;
	photos: GalleryPhoto[];
}