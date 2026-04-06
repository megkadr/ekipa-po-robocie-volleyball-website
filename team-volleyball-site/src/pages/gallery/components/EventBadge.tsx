import type { EventType } from '../types/galleryTypes';
import { eventTypeColors, eventTypeLabels } from '../helpers/galleryHelpers';

interface EventBadgeProps {
	type: EventType;
}

export function EventBadge({ type }: EventBadgeProps) {
	const color = eventTypeColors[type] ?? 'var(--accent)';
	const label = eventTypeLabels[type] ?? type;

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
				color: color,
				background: color + '18',
				border: `1px solid ${color}40`,
				flexShrink: 0,
			}}
		>
			{label}
		</span>
	);
}