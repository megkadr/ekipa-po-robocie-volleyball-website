import type { Player } from '../../../shared/types/player';

export const positionColors: Record<Player['position'], string> = {
	'Rozgrywający': '#4f8ef7',
	'Atakujący':    '#f75f4f',
	'Przyjmujący':  '#4ff7a0',
	'Libero':       '#f7c94f',
	'Środkowy':     '#b44ff7',
	'Uniwersalny':  '#f74fb4',
};

export const allPositions: Player['position'][] = [
	'Rozgrywający',
	'Atakujący',
	'Przyjmujący',
	'Libero',
	'Środkowy',
	'Uniwersalny',
];

export type SortKey = 'name' | 'number' | 'height' | 'weight' | 'age' | 'seasons';

export const sortLabels: Record<SortKey, string> = {
	name:    'Nazwisko',
	number:  'Numer',
	height:  'Wzrost',
	weight:  'Waga',
	age:     'Wiek',
	seasons: 'Staż',
};

export function sortPlayers(list: Player[], key: SortKey): Player[] {
	return [...list].sort((a, b) => {
		switch (key) {
			case 'name':    return a.lastName.localeCompare(b.lastName, 'pl');
			case 'number':  return a.number - b.number;
			case 'height':  return b.height - a.height;
			case 'weight':  return b.weight - a.weight;
			case 'age':     return a.age - b.age;
			case 'seasons': return b.seasonsInTeam - a.seasonsInTeam;
		}
	});
}