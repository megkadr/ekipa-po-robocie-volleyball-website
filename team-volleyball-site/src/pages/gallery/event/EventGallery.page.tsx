import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { galleryEvents } from '../data/events';
import { formatEventDate } from '../helpers/galleryHelpers';
import { EventBadge } from '../components/EventBadge';
import { PhotoGrid } from './components/PhotoGrid';
import { PhotoLightbox } from './components/PhotoLightbox';
import { DownloadAllButton } from './components/DownloadAllButton';

export default function EventGalleryPage() {
	const { slug }    = useParams<{ slug: string }>();
	const navigate    = useNavigate();
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const event = galleryEvents.find((e) => e.slug === slug);

	// SEO
	useEffect(() => {
		if (event) {
			document.title = `${event.name} ${formatEventDate(event.date)} — Galeria | Ekipa Po Robocie`;
		}
		return () => {
			document.title = 'Ekipa Po Robocie — Amatorska drużyna siatkówki';
		};
	}, [event]);

	if (!event) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '400px',
					gap: '16px',
					padding: '32px',
					textAlign: 'center',
				}}
			>
				<span style={{ fontSize: '56px' }}>📷</span>
				<h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
					Wydarzenie nie zostało znalezione
				</h1>
				<button
					onClick={() => navigate('/galeria')}
					style={{
						all: 'unset',
						cursor: 'pointer',
						padding: '10px 24px',
						borderRadius: '99px',
						background: 'var(--accent)',
						color: '#fff',
						fontWeight: 600,
						fontSize: '14px',
					}}
				>
					Wróć do galerii
				</button>
			</div>
		);
	}

	return (
		<div style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 16px' }}>
			{/* Back */}
			<button
				onClick={() => navigate('/galeria')}
				style={{
					all: 'unset',
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					gap: '6px',
					marginBottom: '28px',
					fontSize: '14px',
					fontWeight: 500,
					color: 'var(--text-secondary)',
					transition: 'color 0.15s',
				}}
				onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
				onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
			>
				← Galeria
			</button>

			{/* Event header */}
			<div
				style={{
					marginBottom: '32px',
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					gap: '16px',
				}}
			>
				<div>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
						<EventBadge type={event.type} />
						<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
							{event.photos.length} zdjęć
						</span>
					</div>

					{/* H1 */}
					<h1
						style={{
							fontSize: '28px',
							fontWeight: 800,
							color: 'var(--text-primary)',
							margin: '0 0 6px',
							lineHeight: 1.2,
						}}
					>
						{event.name}
					</h1>

					<div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
						<span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
							📍 {event.location}
						</span>
						<span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
							{formatEventDate(event.date)}
						</span>
					</div>
				</div>

				{/* Download all */}
				{event.photos.length > 0 && (
					<DownloadAllButton photos={event.photos} eventName={event.name} />
				)}
			</div>

			{/* Photo grid */}
			<PhotoGrid
				photos={event.photos}
				onPhotoClick={(idx) => setLightboxIndex(idx)}
			/>

			{/* Lightbox */}
			{lightboxIndex !== null && (
				<PhotoLightbox
					photos={event.photos}
					currentIndex={lightboxIndex}
					onClose={() => setLightboxIndex(null)}
					onNavigate={setLightboxIndex}
				/>
			)}
		</div>
	);
}