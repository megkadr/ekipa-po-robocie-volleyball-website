import type { YearGroup } from '../helpers/galleryHelpers';
import { EventPreviewCard } from './EventPreviewCard';

interface TimelineMonthProps {
	monthLabel: string;
	events: YearGroup['months'][number]['events'];
}

function TimelineMonth({ monthLabel, events }: TimelineMonthProps) {
	return (
		<div style={{ marginBottom: '32px' }}>
			{/* Month label */}
			<p
				style={{
					margin: '0 0 14px',
					fontSize: '12px',
					fontWeight: 600,
					textTransform: 'uppercase',
					letterSpacing: '0.1em',
					color: 'var(--text-muted)',
				}}
			>
				{monthLabel}
			</p>

			{/* Events grid for this month */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
					gap: '14px',
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
				gridTemplateColumns: '80px 1fr',
				gap: '0 32px',
				position: 'relative',
			}}
		>
			{/* Left — year column */}
			<div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				{/* Year badge */}
				<div
					style={{
						position: 'sticky',
						top: '80px',
						zIndex: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '8px',
					}}
				>
					<div
						style={{
							width: '56px',
							height: '56px',
							borderRadius: '50%',
							background: 'var(--accent-dim)',
							border: '2px solid var(--accent)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '13px',
							fontWeight: 800,
							color: 'var(--accent)',
						}}
					>
						{yearGroup.year}
					</div>

					<span
						style={{
							fontSize: '10px',
							color: 'var(--text-muted)',
							textAlign: 'center',
						}}
					>
						{totalEvents} {totalEvents === 1 ? 'wydarzenie' : 'wydarzeń'}
					</span>
				</div>

				{/* Vertical line */}
				{!isLast && (
					<div
						style={{
							position: 'absolute',
							top: '64px',
							bottom: 0,
							width: '2px',
							background: 'linear-gradient(to bottom, var(--accent), var(--border))',
							opacity: 0.4,
						}}
					/>
				)}
			</div>

			{/* Right — months + events */}
			<div style={{ paddingTop: '8px', paddingBottom: isLast ? 0 : '48px' }}>
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
		<div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
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