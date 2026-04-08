import { useEffect } from 'react';
import type { GalleryPhoto } from '../../types/galleryTypes';
import { LightboxControls } from './LightboxControls';
import { DownloadButton } from './DownloadButton';
import getCorrectPath from "../../../../shared/helpers/images/getCorrectPath.ts";
import {LazyImage} from "../../../../shared/components/images/LazyImage.tsx";

const HEADER_HEIGHT = 64;

interface PhotoLightboxProps {
	photos: GalleryPhoto[];
	currentIndex: number;
	onClose: () => void;
	onNavigate: (index: number) => void;
}

export function PhotoLightbox({ photos, currentIndex, onClose, onNavigate }: PhotoLightboxProps) {
	const photo   = photos[currentIndex];
	const hasPrev = currentIndex > 0;
	const hasNext = currentIndex < photos.length - 1;

	// Keyboard navigation
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape')                        onClose();
			if (e.key === 'ArrowLeft'  && hasPrev) onNavigate(currentIndex - 1);
			if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1);
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [currentIndex, hasPrev, hasNext, onClose, onNavigate]);

	// Prevent body scroll while open
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => { document.body.style.overflow = ''; };
	}, []);

	if (!photo) return null;

	const resolvedSrc = getCorrectPath(photo.path);

	return (
		// Backdrop
		<div
			onClick={onClose}
			style={{
				position: 'fixed',
				top: `${HEADER_HEIGHT}px`,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 60,
				background: 'rgba(0, 0, 0, 0.94)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backdropFilter: 'blur(6px)',
				minHeight: '60vh'
			}}
		>
			{/* Inner — stop propagation */}
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					boxSizing: 'border-box',
				}}
			>
				{/* Photo */}
				<LazyImage
					src={resolvedSrc}
					alt={photo.caption ?? `Zdjęcie ${currentIndex + 1}`}
					style={{
						maxWidth: '100%',
						maxHeight: '100%',
						objectFit: 'contain',
						borderRadius: '8px',
						userSelect: 'none',
						display: 'block',
					}}
					blurAmount="4px"
				/>

				{/* Caption */}
				{photo.caption && (
					<p
						style={{
							position: 'absolute',
							bottom: '52px',
							left: '50%',
							transform: 'translateX(-50%)',
							color: 'rgba(255,255,255,0.75)',
							fontSize: '13px',
							background: 'rgba(0,0,0,0.5)',
							padding: '5px 16px',
							borderRadius: '99px',
							whiteSpace: 'nowrap',
							pointerEvents: 'none',
							maxWidth: 'calc(100% - 160px)',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{photo.caption}
					</p>
				)}

				{/* Download single — top left */}
				<div
					style={{
						position: 'absolute',
						top: '12px',
						left: '16px',
					}}
				>
					<DownloadButton
						resolvedSrc={resolvedSrc}
						photoPath={photo.path}
						label="Pobierz"
					/>
				</div>

				<LightboxControls
					onClose={onClose}
					onPrev={() => onNavigate(currentIndex - 1)}
					onNext={() => onNavigate(currentIndex + 1)}
					hasPrev={hasPrev}
					hasNext={hasNext}
					current={currentIndex}
					total={photos.length}
				/>
			</div>
		</div>
	);
}