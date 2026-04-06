import { useNavigate } from 'react-router-dom';
import type { GalleryEvent } from '../types/galleryTypes';
import { EventBadge } from './EventBadge';
import { formatEventDate } from '../helpers/galleryHelpers';
import {LazyImage} from "../../../shared/components/images/LazyImage.tsx";
import getCorrectPath from "../../../shared/helpers/images/getCorrectPath.ts";

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
				boxSizing: 'border-box',
				textAlign: 'left',
			}}
		>
			<div
				style={{
					borderRadius: '14px',
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
							aspectRatio: previewPhotos.length === 1 ? '16 / 7' : '16 / 9',
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
									gridRow:
										previewPhotos.length > 2 && idx === 0 ? 'span 2' : undefined,
									minHeight: 0,
								}}
							>
								<LazyImage
									src={getCorrectPath(photo.path)}
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
					<div
						style={{
							aspectRatio: '16 / 6',
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
				<div style={{ padding: '12px 14px' }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							marginBottom: '5px',
							flexWrap: 'wrap',
						}}
					>
						<EventBadge type={event.type} />
						<span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
							{event.photos.length} zdjęć
						</span>
					</div>

					<p
						style={{
							margin: 0,
							fontSize: '14px',
							fontWeight: 700,
							color: 'var(--text-primary)',
							lineHeight: 1.3,
							overflowWrap: 'break-word',
						}}
					>
						{event.name}
					</p>

					<div
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: '8px',
							marginTop: '5px',
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