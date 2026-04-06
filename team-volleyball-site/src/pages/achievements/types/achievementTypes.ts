export type AchievementType =
	| 'podium'           // miejsce 1–3 — medal
	| 'top_half'         // miejsce 4–6 w większym turnieju — dobry wynik bez medalu
	| 'honorable_mention' // wyróżnienie: np. wygranie grupy, dojście do półfinału
	| 'mvp'              // MVP turnieju lub sezonu ligowego
	| 'best_season'      // najlepszy sezon w historii drużyny
	| 'milestone';       // kamień milowy: jubileusz, okrągła liczba meczów itp.

export interface Achievement {
	id: string;
	type: AchievementType;
	title: string;
	description: string;
	date: string;
	playerSlug?: string | null;
	eventSlug?: string | null;
	icon: string;
}