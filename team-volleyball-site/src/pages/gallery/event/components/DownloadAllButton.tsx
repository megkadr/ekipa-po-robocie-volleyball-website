import { useState } from 'react';
import type { GalleryPhoto } from '../../types/galleryTypes';
import {downloadPhotosAsZip, type ZipProgress} from "../../../../shared/helpers/files/downloadZip.ts";

interface DownloadAllButtonProps {
	photos: GalleryPhoto[];
	eventSlug: string;
	eventName: string;
}

const phaseLabel: Record<ZipProgress['phase'], string> = {
	downloading: 'Pobieranie…',
	zipping:     'Pakowanie ZIP…',
	done:        'Gotowe!',
	error:       'Błąd',
};

export function DownloadAllButton({ photos, eventSlug, eventName }: DownloadAllButtonProps) {
	const [progress, setProgress] = useState<ZipProgress | null>(null);
	const isWorking = progress !== null && progress.phase !== 'done' && progress.phase !== 'error';

	const handleDownload = async () => {
		if (isWorking) return;
		setProgress({ downloaded: 0, total: photos.length, phase: 'downloading' });

		try {
			await downloadPhotosAsZip(photos, eventSlug, setProgress);
		} catch {
			setProgress({ downloaded: 0, total: photos.length, phase: 'error' });
		} finally {
			// Wyczyść stan po 2s
			setTimeout(() => setProgress(null), 2000);
		}
	};

	const label = () => {
		if (!progress) return `⬇ Pobierz wszystkie jako ZIP (${photos.length})`;

		if (progress.phase === 'downloading') {
			return `${phaseLabel.downloading} ${progress.downloaded}/${progress.total}`;
		}
		if (progress.phase === 'zipping') return phaseLabel.zipping;
		if (progress.phase === 'done')    return '✓ Pobrano!';
		return '✕ Błąd pobierania';
	};

	return (
		<button
			onClick={handleDownload}
			disabled={isWorking}
			title={`Pobierz wszystkie zdjęcia z: ${eventName} jako plik ZIP`}
			style={{
				all: 'unset',
				cursor: isWorking ? 'default' : 'pointer',
				display: 'inline-flex',
				alignItems: 'center',
				gap: '8px',
				padding: '9px 18px',
				borderRadius: '10px',
				fontSize: '13px',
				fontWeight: 600,
				background: progress?.phase === 'done'   ? 'rgba(79,247,160,0.15)' :
					progress?.phase === 'error'  ? 'rgba(247,95,79,0.15)'  :
						'var(--accent-dim)',
				border: `1px solid ${
					progress?.phase === 'done'  ? '#4ff7a0' :
						progress?.phase === 'error' ? '#f75f4f' :
							'var(--accent)'
				}`,
				color: progress?.phase === 'done'   ? '#4ff7a0' :
					progress?.phase === 'error'  ? '#f75f4f' :
						'var(--accent)',
				opacity: isWorking ? 0.85 : 1,
				transition: 'background 0.15s, color 0.15s',
				minWidth: '220px',
				justifyContent: 'center',
			}}
			onMouseEnter={(e) => {
				if (!isWorking) {
					(e.currentTarget as HTMLElement).style.background = 'var(--accent)';
					(e.currentTarget as HTMLElement).style.color = '#fff';
				}
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLElement).style.background = 'var(--accent-dim)';
				(e.currentTarget as HTMLElement).style.color = 'var(--accent)';
			}}
		>
			{/* Progress bar strip */}
			{isWorking && progress.phase === 'downloading' && (
				<span
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						height: '2px',
						background: 'var(--accent)',
						width: `${(progress.downloaded / progress.total) * 100}%`,
						borderRadius: '0 0 10px 10px',
						transition: 'width 0.3s ease',
					}}
				/>
			)}
			{label()}
		</button>
	);
}