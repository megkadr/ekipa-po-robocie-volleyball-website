import type { ScheduleGroup as ScheduleGroupType } from '../helpers/scheduleHelpers';
import { statusColors } from '../helpers/scheduleHelpers';
import { ScheduleEventCard } from './ScheduleEventCard';

interface ScheduleGroupSectionProps {
	group: ScheduleGroupType;
}

export function ScheduleGroupSection({ group }: ScheduleGroupSectionProps) {
	const color = statusColors[group.status];

	return (
		<section style={{ marginBottom: '40px' }}>
			{/* H2 — sekcja grupy */}
			<h2
				style={{
					fontSize: '12px',
					fontWeight: 700,
					textTransform: 'uppercase',
					letterSpacing: '0.1em',
					color,
					margin: '0 0 16px',
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
				}}
			>
				<span
					style={{
						display: 'inline-block',
						width: '24px',
						height: '2px',
						background: color,
						borderRadius: '2px',
					}}
				/>
				{group.label}
				<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>
					({group.events.length})
				</span>
			</h2>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
				{group.events.map((event) => (
					<ScheduleEventCard key={event.id} event={event} />
				))}
			</div>
		</section>
	);
}