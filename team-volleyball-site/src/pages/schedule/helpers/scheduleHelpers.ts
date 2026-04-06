import type { ScheduleEvent, ScheduleEventStatus } from '../types/scheduleTypes';

// ─── Status ────────────────────────────────────────────────────────────────────

/**
 * Wyznacza status wydarzenia na podstawie dzisiejszej daty.
 * - upcoming:  jeszcze się nie zaczęło
 * - ongoing:   liga w trakcie trwania (między startDate a endDate)
 * - finished:  minęło (turniej: po startDate, liga: po endDate)
 */
export function getEventStatus(event: ScheduleEvent): ScheduleEventStatus {
	const today     = new Date();
	today.setHours(0, 0, 0, 0);

	const start = new Date(event.startDate);
	start.setHours(0, 0, 0, 0);

	if (event.endDate) {
		const end = new Date(event.endDate);
		end.setHours(23, 59, 59, 999);

		if (today < start)  return 'upcoming';
		if (today <= end)   return 'ongoing';
		return 'finished';
	}

	// Turniej — jeden dzień
	if (today < start) return 'upcoming';
	if (today.getTime() === start.getTime()) return 'ongoing';
	return 'finished';
}

export const statusLabels: Record<ScheduleEventStatus, string> = {
	upcoming: 'Nadchodzące',
	ongoing:  'W toku',
	finished: 'Zakończone',
};

export const statusColors: Record<ScheduleEventStatus, string> = {
	upcoming: '#4f8ef7',
	ongoing:  '#4ff7a0',
	finished: '#9aa3b8',
};

// ─── Grupowanie ────────────────────────────────────────────────────────────────

export interface ScheduleGroup {
	status: ScheduleEventStatus;
	label: string;
	events: ScheduleEvent[];
}

/**
 * Grupuje i sortuje wydarzenia:
 * ongoing → upcoming (chronologicznie) → finished (od najnowszego)
 */
export function groupScheduleEvents(events: ScheduleEvent[]): ScheduleGroup[] {
	const ongoing  = events.filter((e) => getEventStatus(e) === 'ongoing');
	const upcoming = events
		.filter((e) => getEventStatus(e) === 'upcoming')
		.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
	const finished = events
		.filter((e) => getEventStatus(e) === 'finished')
		.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

	const groups: ScheduleGroup[] = [];

	if (ongoing.length > 0)  groups.push({ status: 'ongoing',  label: 'W toku',        events: ongoing });
	if (upcoming.length > 0) groups.push({ status: 'upcoming', label: 'Nadchodzące',    events: upcoming });
	if (finished.length > 0) groups.push({ status: 'finished', label: 'Zakończone',     events: finished });

	return groups;
}

// ─── Formatowanie dat ──────────────────────────────────────────────────────────

export function formatScheduleDate(isoDate: string): string {
	return new Date(isoDate).toLocaleDateString('pl-PL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

export function formatDateRange(startDate: string, endDate: string | null): string {
	if (!endDate) return formatScheduleDate(startDate);

	const start = new Date(startDate);
	const end   = new Date(endDate);

	// Ten sam rok
	if (start.getFullYear() === end.getFullYear()) {
		return `${start.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' })} – ${end.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}`;
	}

	return `${formatScheduleDate(startDate)} – ${formatScheduleDate(endDate)}`;
}

// ─── Wyniki ────────────────────────────────────────────────────────────────────

export function formatPlacement(place: number, totalTeams: number): string {
	const suffix = place === 1 ? '🥇' : place === 2 ? '🥈' : place === 3 ? '🥉' : `${place}.`;
	return `${suffix} miejsce na ${totalTeams} drużyn`;
}

export function getPlacementColor(place: number): string {
	if (place === 1) return '#f59e0b';
	if (place === 2) return '#9ca3af';
	if (place === 3) return '#b45309';
	return 'var(--text-muted)';
}

export const eventTypeLabels: Record<string, string> = {
	turniej: 'Turniej',
	liga:    'Liga',
};

export const eventTypeColors: Record<string, string> = {
	turniej: '#4f8ef7',
	liga:    '#f75f4f',
};