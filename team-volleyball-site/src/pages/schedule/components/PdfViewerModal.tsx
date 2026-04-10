import { useEffect } from 'react';
import {downloadPdf, getPdfFilename, resolvePdfPath} from "../helpers/pdfHelpers.ts";

interface PdfViewerModalProps {
	path: string;
	label: string;
	onClose: () => void;
}

export function PdfViewerModal({ path, label, onClose }: PdfViewerModalProps) {
	const resolvedUrl = resolvePdfPath(path);
	const filename    = getPdfFilename(path);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
		window.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			window.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [onClose]);

	return (
		<div
			onClick={onClose}
			style={{
				position: 'fixed',
				inset: 0,
				zIndex: 70,
				background: 'rgba(0,0,0,0.85)',
				backdropFilter: 'blur(4px)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '16px',
			}}
		>
			{/* Dialog box */}
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					width: '100%',
					maxWidth: '900px',
					height: '90svh',
					borderRadius: '16px',
					border: '1px solid var(--border)',
					background: 'var(--bg-surface)',
					display: 'flex',
					flexDirection: 'column',
					overflow: 'hidden',
					boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
					marginTop: '4vh'
				}}
			>
				{/* Modal header */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
						padding: '14px 16px',
						borderBottom: '1px solid var(--border)',
						background: 'var(--bg-elevated)',
						flexShrink: 0,
					}}
				>
					<span style={{ fontSize: '18px' }}>📄</span>

					<p
						style={{
							margin: 0,
							flex: 1,
							fontSize: '14px',
							fontWeight: 600,
							color: 'var(--text-primary)',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{label}
					</p>

					{/* Download */}
					<button
						onClick={() => downloadPdf(resolvedUrl, filename)}
						style={{
							all: 'unset',
							cursor: 'pointer',
							padding: '6px 14px',
							borderRadius: '8px',
							fontSize: '12px',
							fontWeight: 600,
							background: 'var(--bg-muted)',
							color: 'var(--text-secondary)',
							border: '1px solid var(--border)',
							transition: 'all 0.15s',
							flexShrink: 0,
						}}
						onMouseEnter={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.background = 'var(--accent-dim)';
							el.style.color = 'var(--accent)';
							el.style.borderColor = 'var(--accent)';
						}}
						onMouseLeave={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.background = 'var(--bg-muted)';
							el.style.color = 'var(--text-secondary)';
							el.style.borderColor = 'var(--border)';
						}}
					>
						⬇ Pobierz
					</button>

					{/* Close */}
					<button
						onClick={onClose}
						aria-label="Zamknij podgląd"
						style={{
							all: 'unset',
							cursor: 'pointer',
							width: '32px',
							height: '32px',
							borderRadius: '8px',
							background: 'var(--bg-muted)',
							color: 'var(--text-secondary)',
							border: '1px solid var(--border)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '16px',
							flexShrink: 0,
							transition: 'all 0.15s',
						}}
						onMouseEnter={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.background = '#f75f4f20';
							el.style.color = '#f75f4f';
							el.style.borderColor = '#f75f4f40';
						}}
						onMouseLeave={(e) => {
							const el = e.currentTarget as HTMLElement;
							el.style.background = 'var(--bg-muted)';
							el.style.color = 'var(--text-secondary)';
							el.style.borderColor = 'var(--border)';
						}}
					>
						✕
					</button>
				</div>

				{/* iframe — fills remaining height */}
				<iframe
					src={`${resolvedUrl}#toolbar=1&navpanes=0`}
					title={label}
					style={{
						flex: 1,
						width: '100%',
						border: 'none',
						display: 'block',
						background: 'var(--bg-elevated)',
					}}
				/>
			</div>
		</div>
	);
}