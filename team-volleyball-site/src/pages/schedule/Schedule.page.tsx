import { scheduleEvents } from './data/scheduleEvents';
import { groupScheduleEvents } from './helpers/scheduleHelpers';
import { ScheduleGroupSection } from './components/ScheduleGroupSection';

export default function SchedulePage() {
	const groups = groupScheduleEvents(scheduleEvents);

	return (
		<div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 16px' }}>
			<div style={{ marginBottom: '40px' }}>
				<span
					style={{
						fontSize: '11px',
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						fontWeight: 600,
						color: 'var(--accent)',
					}}
				>
					Sezon
				</span>
				{/* H1 */}
				<h1
					style={{
						fontSize: '36px',
						fontWeight: 800,
						color: 'var(--text-primary)',
						margin: '4px 0 8px',
						lineHeight: 1.2,
					}}
				>
					Terminarz
				</h1>
				<p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
					Turnieje i ligi, w których uczestniczy lub uczestniczyła Ekipa Po
					Robocie. Kliknij wydarzenie, aby zobaczyć szczegóły i wyniki.
				</p>
			</div>

			{groups.length === 0 ? (
				<div
					style={{
						textAlign: 'center',
						padding: '80px 20px',
						color: 'var(--text-muted)',
					}}
				>
					<span style={{ fontSize: '56px', display: 'block', marginBottom: '16px' }}>📅</span>
					<p style={{ margin: 0 }}>Brak zaplanowanych wydarzeń.</p>
				</div>
			) : (
				groups.map((group) => (
					<ScheduleGroupSection key={group.status} group={group} />
				))
			)}
		</div>
	);
}