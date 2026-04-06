import type { Achievement } from '../types/achievementTypes';

/**
 * Lista osiągnięć drużyny.
 *
 * Jak dodać:
 * - Po zakończeniu turnieju/ligi z wynikiem top 3 → dodaj wpis type: 'podium'
 * - Gdy ktoś dostał MVP → type: 'mvp' z playerSlug
 * - Okrągłe liczby, jubileusze → type: 'milestone'
 */
export const achievements: Achievement[] = [
	{
		id: 'ach-1',
		type: 'top_half',
		title: '4. miejsce — XIV Tłustoczwartkowy Turniej',
		description: 'Drużyna zajęła 4. miejsce spośród 8 drużyn na turnieju w Tereszewie.',
		date: '2026-02-12',
		eventSlug: 'tlustoczwartkowy-turniej-2026',
		playerSlug: null,
		icon: '🎯',
	},
	{
	  id: 'ach-2',
	  type: 'honorable_mention',
	  title: 'Zwycięstwo w grupie pierwszej — XIV Tłustoczwartkowy Turniej',
	  description: 'Wygraliśmy fazę grupową z bilansem 3W/0L.',
	  date: '2026-02-12',
	  eventSlug: 'tlustoczwartkowy-turniej-2026',
	  playerSlug: null,
	  icon: '⭐',
	},
];