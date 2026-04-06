import type { GalleryPhoto } from '../../types/galleryTypes';
import { resolvePhotoPath } from '../../helpers/galleryHelpers';
import {LazyImage} from "../../../../shared/components/images/LazyImage.tsx";

interface PhotoGridProps {
	photos: GalleryPhoto[];
	onPhotoClick: (index: number) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
	if (photos.length === 0) {
		return (
			<div
				style={{
					textAlign: 'center',
					padding: '60px 20px',
					color: 'var(--text-muted)',
				}}
			>
				<span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>📷</span>
				Brak zdjęć dla tego wydarzenia.
			</div>
		);
	}

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
				gap: '8px',
			}}
		>
			{photos.map((photo, idx) => (
				<button
					key={photo.path}
					onClick={() => onPhotoClick(idx)}
					style={{
						all: 'unset',
						cursor: 'pointer',
						display: 'block',
						borderRadius: '10px',
						overflow: 'hidden',
						aspectRatio: '4 / 3',
						background: 'var(--bg-elevated)',
						position: 'relative',
					}}
				>
					<LazyImage
						src={resolvePhotoPath(photo.path)}
						alt={photo.caption ?? `Zdjęcie ${idx + 1}`}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							display: 'block',
							transition: 'transform 0.3s ease',
						}}
					/>

					{/* Hover overlay */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							background: 'rgba(79,142,247,0)',
							transition: 'background 0.2s',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '24px',
							opacity: 0,
						}}
						className="photo-hover-overlay"
						onMouseEnter={(e) => {
							(e.currentTarget as HTMLElement).style.background = 'rgba(79,142,247,0.25)';
							(e.currentTarget as HTMLElement).style.opacity = '1';
						}}
						onMouseLeave={(e) => {
							(e.currentTarget as HTMLElement).style.background = 'rgba(79,142,247,0)';
							(e.currentTarget as HTMLElement).style.opacity = '0';
						}}
					>
						🔍
					</div>
				</button>
			))}
		</div>
	);
}