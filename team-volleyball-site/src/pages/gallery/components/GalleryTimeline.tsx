import type { YearGroup } from '../helpers/galleryHelpers';
import { EventPreviewCard } from './EventPreviewCard';

interface TimelineMonthProps {
	monthLabel: string;
	events: YearGroup['months'][number]['events'];
}

function TimelineMonth({ monthLabel, events }: TimelineMonthProps) {
	return (
		<div style={{ marginBottom: '28px' }}>
			<p
				style={{
					margin: '0 0 12px',
					fontSize: '11px',
					fontWeight: 600,
					textTransform: 'uppercase',
					letterSpacing: '0.1em',
					color: 'var(--text-muted)',
				}}
			>
				{monthLabel}
			</p>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
					gap: '12px',
				}}
			>
				{events.map((event) => (
					<EventPreviewCard key={event.slug} event={event} />
				))}
			</div>
		</div>
	);
}

interface TimelineYearProps {
	yearGroup: YearGroup;
	isLast: boolean;
}

function TimelineYear({ yearGroup, isLast }: TimelineYearProps) {
	const totalEvents = yearGroup.months.reduce((acc, m) => acc + m.events.length, 0);

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'clamp(48px, 10vw, 80px) 1fr',
				gap: '0 16px',
				position: 'relative',
				minWidth: 0,
			}}
		>
			{/* Left — year column */}
			<div
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* Year badge — sticky podczas scrollowania */}
				<div
					style={{
						position: 'sticky',
						top: '80px',
						zIndex: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '6px',
					}}
				>
					<div
						style={{
							width: 'clamp(40px, 8vw, 56px)',
							height: 'clamp(40px, 8vw, 56px)',
							borderRadius: '50%',
							background: 'var(--accent-dim)',
							border: '2px solid var(--accent)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 'clamp(10px, 2vw, 13px)',
							fontWeight: 800,
							color: 'var(--accent)',
							flexShrink: 0,
						}}
					>
						{yearGroup.year}
					</div>

					<span
						style={{
							fontSize: '9px',
							color: 'var(--text-muted)',
							textAlign: 'center',
							lineHeight: 1.3,
						}}
					>
						{totalEvents}{' '}
						{totalEvents === 1 ? 'event' : 'eventów'}
					</span>
				</div>

				{/* Vertical connecting line */}
				{!isLast && (
					<div
						style={{
							position: 'absolute',
							top: 'clamp(44px, 9vw, 64px)',
							bottom: 0,
							width: '2px',
							background: 'linear-gradient(to bottom, var(--accent), var(--border))',
							opacity: 0.35,
						}}
					/>
				)}
			</div>

			{/* Right — months + events */}
			<div
				style={{
					paddingTop: '6px',
					paddingBottom: isLast ? 0 : '40px',
					minWidth: 0,
					overflow: 'hidden',
				}}
			>
				{yearGroup.months.map((monthGroup) => (
					<TimelineMonth
						key={monthGroup.month}
						monthLabel={monthGroup.monthLabel}
						events={monthGroup.events}
					/>
				))}
			</div>
		</div>
	);
}

interface GalleryTimelineProps {
	yearGroups: YearGroup[];
}

export function GalleryTimeline({ yearGroups }: GalleryTimelineProps) {
	if (yearGroups.length === 0) {
		return (
			<div
				style={{
					textAlign: 'center',
					padding: '80px 20px',
					color: 'var(--text-muted)',
				}}
			>
				<span style={{ fontSize: '56px', display: 'block', marginBottom: '16px' }}>📷</span>
				<p style={{ margin: 0, fontSize: '16px' }}>
					Brak zdjęć w galerii. Wróć wkrótce!
				</p>
			</div>
		);
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden' }}>
			{yearGroups.map((yearGroup, idx) => (
				<TimelineYear
					key={yearGroup.year}
					yearGroup={yearGroup}
					isLast={idx === yearGroups.length - 1}
				/>
			))}
		</div>
	);
}