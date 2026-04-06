import { getPhotoFilename } from '../../helpers/galleryHelpers';

interface DownloadButtonProps {
	photoPath: string;
	resolvedSrc: string;
	label?: string;
	style?: React.CSSProperties;
}

export function DownloadButton({ resolvedSrc, photoPath, label = 'Pobierz', style }: DownloadButtonProps) {
	const handleDownload = async (e: React.MouseEvent) => {
		e.stopPropagation();

		try {
			const response = await fetch(resolvedSrc);
			const blob     = await response.blob();
			const url       = URL.createObjectURL(blob);
			const a         = document.createElement('a');
			a.href          = url;
			a.download      = getPhotoFilename(photoPath);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch {
			window.open(resolvedSrc, '_blank');
		}
	};

	return (
		<button
			onClick={handleDownload}
			title={`Pobierz: ${getPhotoFilename(photoPath)}`}
			style={{
				all: 'unset',
				cursor: 'pointer',
				display: 'inline-flex',
				alignItems: 'center',
				gap: '6px',
				padding: '7px 14px',
				borderRadius: '99px',
				fontSize: '12px',
				fontWeight: 600,
				background: 'rgba(255,255,255,0.12)',
				color: '#fff',
				border: '1px solid rgba(255,255,255,0.2)',
				backdropFilter: 'blur(8px)',
				transition: 'background 0.15s',
				...style,
			}}
			onMouseEnter={(e) => {
				(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.22)';
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
			}}
		>
			⬇ {label}
		</button>
	);
}