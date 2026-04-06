import { useNavigate } from 'react-router-dom';
import type { GalleryEvent } from '../types/galleryTypes';
import { EventBadge } from './EventBadge';
import { formatEventDate, resolvePhotoPath } from '../helpers/galleryHelpers';
import {LazyImage} from "../../../shared/components/images/LazyImage.tsx";

interface EventPreviewCardProps {
	event: GalleryEvent;
}

const MAX_PREVIEW_PHOTOS = 4;

export function EventPreviewCard({ event }: EventPreviewCardProps) {
	const navigate = useNavigate();
	const previewPhotos = event.photos.slice(0, MAX_PREVIEW_PHOTOS);
	const remaining     = event.photos.length - MAX_PREVIEW_PHOTOS;

	return (
		<button
			onClick={() => navigate(`/galeria/${event.slug}`)}
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
					borderRadius: '16px',
					border: '1px solid var(--border)',
					background: 'var(--bg-surface)',
					overflow: 'hidden',
					transition: 'border-color 0.2s, box-shadow 0.2s',
				}}
				onMouseEnter={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'var(--accent)';
					el.style.boxShadow   = '0 8px 32px rgba(79,142,247,0.12)';
				}}
				onMouseLeave={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'var(--border)';
					el.style.boxShadow   = 'none';
				}}
			>
				{/* Photo grid preview */}
				{previewPhotos.length > 0 ? (
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: previewPhotos.length === 1 ? '1fr' : 'repeat(2, 1fr)',
							gap: '2px',
							height: '180px',
							overflow: 'hidden',
						}}
					>
						{previewPhotos.map((photo, idx) => (
							<div
								key={photo.path}
								style={{
									position: 'relative',
									overflow: 'hidden',
									background: 'var(--bg-elevated)',
									// Pierwsze zdjęcie zajmuje całą lewą kolumnę gdy jest więcej niż 1
									gridRow: previewPhotos.length > 2 && idx === 0 ? 'span 2' : undefined,
								}}
							>
								<LazyImage
									src={resolvePhotoPath(photo.path)}
									alt={photo.caption ?? `Zdjęcie ${idx + 1} z ${event.name}`}
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
										display: 'block',
									}}
								/>

								{/* Overlay "+N więcej" na ostatnim zdjęciu */}
								{idx === previewPhotos.length - 1 && remaining > 0 && (
									<div
										style={{
											position: 'absolute',
											inset: 0,
											background: 'rgba(0,0,0,0.55)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: '#fff',
											fontSize: '18px',
											fontWeight: 800,
										}}
									>
										+{remaining}
									</div>
								)}
							</div>
						))}
					</div>
				) : (
					// Placeholder gdy brak zdjęć
					<div
						style={{
							height: '120px',
							background: 'var(--bg-elevated)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '40px',
						}}
					>
						📷
					</div>
				)}

				{/* Event info */}
				<div style={{ padding: '14px 16px' }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
						<EventBadge type={event.type} />
						<span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
							{event.photos.length} zdjęć
						</span>
					</div>

					<p
						style={{
							margin: 0,
							fontSize: '15px',
							fontWeight: 700,
							color: 'var(--text-primary)',
							lineHeight: 1.3,
						}}
					>
						{event.name}
					</p>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '12px',
							marginTop: '6px',
						}}
					>
						<span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
							📍 {event.location}
						</span>
						<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
							{formatEventDate(event.date)}
						</span>
					</div>
				</div>
			</div>
		</button>
	);
}