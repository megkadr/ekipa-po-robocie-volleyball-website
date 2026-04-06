import { useState } from 'react';
import type { GalleryPhoto } from '../../types/galleryTypes';
import { resolvePhotoPath, getPhotoFilename } from '../../helpers/galleryHelpers';

interface DownloadAllButtonProps {
	photos: GalleryPhoto[];
	eventName: string;
}

export function DownloadAllButton({ photos, eventName }: DownloadAllButtonProps) {
	const [isDownloading, setIsDownloading] = useState(false);
	const [progress, setProgress]           = useState(0);

	const handleDownloadAll = async () => {
		if (isDownloading) return;
		setIsDownloading(true);
		setProgress(0);

		for (let i = 0; i < photos.length; i++) {
			const photo = photos[i]!;
			try {
				const response = await fetch(resolvePhotoPath(photo.path));
				const blob     = await response.blob();
				const url      = URL.createObjectURL(blob);
				const a        = document.createElement('a');
				a.href         = url;
				a.download     = getPhotoFilename(photo.path);
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			} catch {
				console.warn(`Nie udało się pobrać: ${photo.path}`);
			}
			setProgress(i + 1);
			await new Promise((res) => setTimeout(res, 150));
		}

		setIsDownloading(false);
		setProgress(0);
	};

	return (
		<button
			onClick={handleDownloadAll}
			disabled={isDownloading}
			title={`Pobierz wszystkie zdjęcia z: ${eventName}`}
			style={{
				all: 'unset',
				cursor: isDownloading ? 'default' : 'pointer',
				display: 'inline-flex',
				alignItems: 'center',
				gap: '8px',
				padding: '9px 18px',
				borderRadius: '10px',
				fontSize: '13px',
				fontWeight: 600,
				background: 'var(--accent-dim)',
				border: '1px solid var(--accent)',
				color: 'var(--accent)',
				transition: 'background 0.15s',
				opacity: isDownloading ? 0.7 : 1,
			}}
			onMouseEnter={(e) => {
				if (!isDownloading)
					(e.currentTarget as HTMLElement).style.background = 'var(--accent)';
				if (!isDownloading)
					(e.currentTarget as HTMLElement).style.color = '#fff';
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
				(e.currentTarget as HTMLElement).style.color = 'var(--accent)';
			}}
		>
			{isDownloading ? (
				<>⬇ Pobieranie… {progress}/{photos.length}</>
			) : (
				<>⬇ Pobierz wszystkie ({photos.length})</>
			)}
		</button>
	);
}