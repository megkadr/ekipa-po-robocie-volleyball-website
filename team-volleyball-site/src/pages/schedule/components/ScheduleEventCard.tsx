import { useNavigate } from 'react-router-dom';
import type { ScheduleEvent } from '../types/scheduleTypes';
import { TypeBadge, StatusBadge } from './ScheduleBadges';
import {
	getEventStatus,
	formatDateRange,
	formatPlacement,
	getPlacementColor,
} from '../helpers/scheduleHelpers';

interface ScheduleEventCardProps {
	event: ScheduleEvent;
}

export function ScheduleEventCard({ event }: ScheduleEventCardProps) {
	const navigate = useNavigate();
	const status   = getEventStatus(event);

	const placement = event.result
		? formatPlacement(event.result.place, event.result.totalTeams)
		: null;
	const placementColor = event.result
		? getPlacementColor(event.result.place)
		: 'var(--text-muted)';

	return (
		<button
			onClick={() => navigate(`/terminarz/${event.slug}`)}
			style={{
				all: 'unset',
				cursor: 'pointer',
				display: 'block',
				width: '100%',
				textAlign: 'left',
			}}
		>
			<div
				style={{
					borderRadius: '14px',
					border: '1px solid var(--border)',
					background: 'var(--bg-surface)',
					padding: '16px 20px',
					transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
					display: 'flex',
					alignItems: 'center',
					gap: '16px',
					flexWrap: 'wrap',
				}}
				onMouseEnter={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'var(--accent)';
					el.style.boxShadow   = '0 4px 20px rgba(79,142,247,0.1)';
					el.style.transform   = 'translateX(4px)';
				}}
				onMouseLeave={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'var(--border)';
					el.style.boxShadow   = 'none';
					el.style.transform   = 'translateX(0)';
				}}
			>
				{/* Date column */}
				<div
					style={{
						minWidth: '56px',
						textAlign: 'center',
						flexShrink: 0,
					}}
				>
					<p style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
						{new Date(event.startDate).getDate()}
					</p>
					<p style={{ margin: '2px 0 0', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
						{new Date(event.startDate).toLocaleDateString('pl-PL', { month: 'short' })}
					</p>
					<p style={{ margin: '2px 0 0', fontSize: '10px', color: 'var(--text-muted)' }}>
						{new Date(event.startDate).getFullYear()}
					</p>
				</div>

				{/* Divider */}
				<div style={{ width: '1px', height: '48px', background: 'var(--border)', flexShrink: 0 }} />

				{/* Main info */}
				<div style={{ flex: 1, minWidth: 0 }}>
					<div style={{ display: 'flex', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
						<TypeBadge type={event.type} />
						<StatusBadge status={status} />
					</div>

					<p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
						{event.name}
					</p>

					<div style={{ display: 'flex', gap: '12px', marginTop: '5px', flexWrap: 'wrap' }}>
						<span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
							📍 {event.location}
						</span>
						<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
							{formatDateRange(event.startDate, event.endDate)}
						</span>
					</div>
				</div>

				{/* Result / arrow */}
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
					{placement && (
						<span style={{ fontSize: '13px', fontWeight: 700, color: placementColor }}>
							{placement}
						</span>
					)}
					<span style={{ color: 'var(--text-muted)', fontSize: '18px' }}>→</span>
				</div>
			</div>
		</button>
	);
}