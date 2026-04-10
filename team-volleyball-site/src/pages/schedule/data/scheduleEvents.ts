import type { ScheduleEvent } from '../types/scheduleTypes';

/**
 * Lista wszystkich wydarzeń w terminarzu.
 *
 * Jak dodać nowe wydarzenie:
 * 1. Uzupełnij pola name, type, location, startDate, endDate (null dla turniejów)
 * 2. Przed wydarzeniem: result = null
 * 3. Po wydarzeniu: uzupełnij result z wynikami
 * 4. Opcjonalnie: powiąż ze slugiem galerii przez gallerySlug
 */
export const scheduleEvents: ScheduleEvent[] = [
	{
		id: 'event-1',
		slug: 'tlustoczwartkowy-turniej-2026',
		name: 'XIV Tłustoczwartkowy Turniej Piłki Siatkowej',
		type: 'turniej',
		location: 'Tereszewo',
		startDate: '2026-02-12',
		endDate: null,
		description: 'Coroczny tłustoczwartkowy turniej piłki siatkowej organizowany w Tereszewie.',
		gallerySlug: 'tłustoczwartkowy-turniej-piłki-siatkowej-2026-02-12',
		result: {
			place: 4,
			totalTeams: 8,
			matches: [
				{
					opponent: 'Turbo ćwiartka',
					sets: [2, 0],
					setScores: [],
				},
				{
					opponent: 'Sebcar',
					sets: [2, 0],
					setScores: [],
				},
				{
					opponent: 'KPP w Nowym Mieście Lub.',
					sets: [2, 0],
					setScores: [],
				},
				{
					opponent: 'Borek Team',
					sets: [1, 2],
					setScores: [],
				},
				{
					opponent: 'KPP w Nowym Mieście Lub.',
					sets: [1, 2],
					setScores: [],
				},
			],
			mvpPlayerSlug: null,
			notes: 'Świetna atmosfera, trudna rywalizacja w fazie pucharowej.',
		},
	},
	{
		id: 'event-2',
		slug: 'turniej-siatkowki-wiosna-volley-2026-2-edycja',
		name: 'Turniej Siatkówki „Wiosna Volley” 2026 – II edycja',
		type: 'turniej',
		location: 'Iława',
		startDate: '2026-04-19',
		endDate: null,
		description: 'II edycja turnieju Wiosna Volley',
		gallerySlug: null, //'turniej-siatkowki-wiosna-volley-2026-04-19'
		result: null,
		documents: [
			{
				path: 'assets/docs/wiosna-volley-2026/Regulamin_Wiosna_Volley_2026.pdf',
				label: 'Regulamin turnieju Wiosna Volley 2026',
				hasRegistrationForm: true,
			},
		],
	},
	{
		id: 'event-3',
		slug: 'bals-biskupiec-2026',
		name: 'Liga BALS Biskupiec',
		type: 'liga',
		location: 'Biskupiec',
		startDate: '2026-09-01',
		endDate: '2026-12-31',
		description: 'Amatorska liga siatkówki BALS w Biskupcu. Rozgrywki obejmują fazę grupową oraz playoffs.',
		gallerySlug: null,
		result: null,
	},
];