import { galleryEvents } from './data/events';
import { groupEventsByYearAndMonth } from './helpers/galleryHelpers';
import { GalleryTimeline } from './components/GalleryTimeline';

export default function GalleryPage() {
	const yearGroups = groupEventsByYearAndMonth(galleryEvents);

	return (
		<div
			style={{
				maxWidth: '1024px',
				margin: '0 auto',
				padding: '48px 16px',
				overflowX: 'hidden',
				boxSizing: 'border-box',
				width: '100%',
			}}
		>
			<div style={{ marginBottom: '48px' }}>
				<span
					style={{
						fontSize: '11px',
						textTransform: 'uppercase',
						letterSpacing: '0.1em',
						fontWeight: 600,
						color: 'var(--accent)',
					}}
				>
					Wspomnienia
				</span>
				{/* H1 */}
				<h1
					style={{
						fontSize: 'clamp(24px, 5vw, 36px)',
						fontWeight: 800,
						color: 'var(--text-primary)',
						margin: '4px 0 8px',
						lineHeight: 1.2,
					}}
				>
					Galeria
				</h1>
				<p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
					Zdjęcia z turniejów i lig, w których uczestniczyła Ekipa Po Robocie.
					Kliknij wydarzenie, aby zobaczyć wszystkie zdjęcia.
				</p>
			</div>

			<GalleryTimeline yearGroups={yearGroups} />
		</div>
	);
}