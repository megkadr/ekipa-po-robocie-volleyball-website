import type { Achievement, AchievementType } from '../types/achievementTypes';

export const achievementTypeLabels: Record<AchievementType, string> = {
	podium:            'Podium',
	top_half:          'Dobry wynik',
	honorable_mention: 'Wyróżnienie',
	mvp:               'MVP',
	best_season:       'Najlepszy sezon',
	milestone:         'Kamień milowy',
};

export const achievementTypeColors: Record<AchievementType, string> = {
	podium:            '#f59e0b',   // złoto
	top_half:          '#4f8ef7',   // niebieski — solidny wynik
	honorable_mention: '#4ff7a0',   // zielony — powód do dumy
	mvp:               '#b44ff7',   // fioletowy — indywidualny
	best_season:       '#f75f4f',   // czerwony — historyczny
	milestone:         '#9aa3b8',   // szary — jubileuszowy
};

export function sortAchievementsByDate(list: Achievement[]): Achievement[] {
	return [...list].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

export function formatAchievementDate(isoDate: string): string {
	return new Date(isoDate).toLocaleDateString('pl-PL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}