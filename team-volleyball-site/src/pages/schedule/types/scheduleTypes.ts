export type ScheduleEventType = 'turniej' | 'liga';
export type ScheduleEventStatus = 'upcoming' | 'ongoing' | 'finished';

export interface MatchResult {
	opponent: string;
	sets: [number, number];
	ourPoints?: number;
	theirPoints?: number;
	setScores?: string[];
}

export interface TournamentResult {
	place: number;
	totalTeams: number;
	matches: MatchResult[];
	mvpPlayerSlug?: string | null;
	notes?: string;
}

export interface LeagueResult {
	place: number;
	totalTeams: number;
	wins: number;
	losses: number;
	mvpPlayerSlug?: string | null;
	notes?: string;
}

/**
 * Dokument PDF dołączony do wydarzenia (np. regulamin turnieju).
 * Plik umieść w: public/assets/docs/{slug}/
 */
export interface EventDocument {
	path: string;
	label: string;
	hasRegistrationForm?: boolean;
}

export interface ScheduleEvent {
	id: string;
	slug: string;
	name: string;
	type: ScheduleEventType;
	location: string;
	startDate: string;
	endDate: string | null;
	description: string;
	result: TournamentResult | LeagueResult | null;
	gallerySlug?: string | null;
	documents?: EventDocument[];
}