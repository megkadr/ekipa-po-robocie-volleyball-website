export interface Player {
	id: string;
	/**
	 * Slug SEO-friendly do URL, np. "jan-kowalski-1"
	 * Format: {imie-nazwisko}-{numer} — unikalny, po polsku, bez znaków specjalnych
	 */
	slug: string;
	firstName: string;
	lastName: string;
	number: number;
	position: 'Rozgrywający' | 'Atakujący' | 'Przyjmujący' | 'Libero' | 'Środkowy' | 'Uniwersalny';
	height: number;
	weight: number;
	age: number;
	bio: string;
	hobbies: string[];
	photoUrl: string | null;
	idol: string | null;
	seasonsInTeam: number;
	isCaptain: boolean;
}