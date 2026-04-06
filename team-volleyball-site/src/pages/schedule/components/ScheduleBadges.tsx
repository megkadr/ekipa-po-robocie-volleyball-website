import type { ScheduleEventStatus, ScheduleEventType } from '../types/scheduleTypes';
import { statusColors, statusLabels, eventTypeColors, eventTypeLabels } from '../helpers/scheduleHelpers';

interface TypeBadgeProps {
	type: ScheduleEventType;
}

export function TypeBadge({ type }: TypeBadgeProps) {
	const color = eventTypeColors[type] ?? 'var(--accent)';
	return (
		<span
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				padding: '2px 10px',
				borderRadius: '99px',
				fontSize: '10px',
				fontWeight: 700,
				textTransform: 'uppercase',
				letterSpacing: '0.07em',
				color,
				background: color + '18',
				border: `1px solid ${color}40`,
				flexShrink: 0,
			}}
		>
			{eventTypeLabels[type] ?? type}
		</span>
	);
}

interface StatusBadgeProps {
	status: ScheduleEventStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
	const color = statusColors[status];
	const dot   = status === 'ongoing'
		? <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, display: 'inline-block', marginRight: '5px', boxShadow: `0 0 6px ${color}` }} />
		: null;

	return (
		<span
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				padding: '2px 10px',
				borderRadius: '99px',
				fontSize: '10px',
				fontWeight: 700,
				textTransform: 'uppercase',
				letterSpacing: '0.07em',
				color,
				background: color + '18',
				border: `1px solid ${color}40`,
				flexShrink: 0,
			}}
		>
			{dot}
			{statusLabels[status]}
		</span>
	);
}