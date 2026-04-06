export type ScheduleEventType = 'turniej' | 'liga';
export type ScheduleEventStatus = 'upcoming' | 'ongoing' | 'finished';

/** Wynik indywidualnego meczu w turnieju */
export interface MatchResult {
	opponent: string;
	/** Sety wygrany:przegrany, np. [2, 0] */
	sets: [number, number];
	/** Punkty łączne naszej drużyny */
	ourPoints?: number;
	/** Punkty łączne przeciwnika */
	theirPoints?: number;
	/** Wynik seta szczegółowo, np. ["25:20", "25:18"] */
	setScores?: string[];
}

/** Wynik turnieju (rozgrywany w jeden dzień / weekend) */
export interface TournamentResult {
	/** Zajęte miejsce */
	place: number;
	/** Łączna liczba drużyn */
	totalTeams: number;
	/** Wyniki poszczególnych meczów */
	matches: MatchResult[];
	/** Czy ktoś dostał MVP */
	mvpPlayerSlug?: string | null;
	/** Dodatkowe uwagi */
	notes?: string;
}

/** Wynik ligi (rozgrywanej przez kilka miesięcy) */
export interface LeagueResult {
	/** Końcowe miejsce w tabeli */
	place: number;
	totalTeams: number;
	/** Bilans meczów: wygrane / przegrane */
	wins: number;
	losses: number;
	/** MVP sezonu */
	mvpPlayerSlug?: string | null;
	notes?: string;
}

export interface ScheduleEvent {
	id: string;
	/** SEO-friendly slug, używany w URL, np. "bals-biskupiec-2024" */
	slug: string;
	name: string;
	type: ScheduleEventType;
	location: string;
	/**
	 * Dla turnieju: data jednego dnia "2024-06-08"
	 * Dla ligi: data pierwszego spotkania
	 */
	startDate: string;
	/**
	 * Dla ligi: data ostatniego spotkania sezonu
	 * Dla turnieju: null (rozgrywa się tego samego dnia co startDate)
	 */
	endDate: string | null;
	description: string;
	/** Wynik — null gdy wydarzenie jeszcze się nie odbyło */
	result: TournamentResult | LeagueResult | null;
	/** Slug powiązanego wydarzenia w galerii (opcjonalny) */
	gallerySlug?: string | null;
}