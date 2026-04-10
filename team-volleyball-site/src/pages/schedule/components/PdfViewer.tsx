import { useState } from 'react';
import { PdfViewerModal } from './PdfViewerModal';
import {downloadPdf, getPdfFilename, resolvePdfPath} from "../helpers/pdfHelpers.ts";

interface PdfViewerProps {
	path: string;
	label: string;
}

export function PdfViewer({ path, label }: PdfViewerProps) {
	const [modalOpen, setModalOpen] = useState(false);

	const resolvedUrl = resolvePdfPath(path);
	const filename    = getPdfFilename(path);

	return (
		<>
			<div
				style={{
					borderRadius: '14px',
					border: '1px solid var(--border)',
					background: 'var(--bg-surface)',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '12px',
						padding: '14px 16px',
						background: 'var(--bg-elevated)',
						flexWrap: 'wrap',
					}}
				>
					{/* Icon + label */}
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
						<span
							style={{
								width: '36px',
								height: '36px',
								borderRadius: '8px',
								background: '#f75f4f18',
								border: '1px solid #f75f4f40',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '18px',
								flexShrink: 0,
							}}
						>
							📄
						</span>
						<div style={{ minWidth: 0 }}>
							<p
								style={{
									margin: 0,
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
							<p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>
								{filename}
							</p>
						</div>
					</div>

					{/* Buttons */}
					<div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
						<button
							onClick={() => setModalOpen(true)}
							style={{
								all: 'unset',
								cursor: 'pointer',
								padding: '7px 14px',
								borderRadius: '8px',
								fontSize: '12px',
								fontWeight: 600,
								background: 'var(--accent-dim)',
								color: 'var(--accent)',
								border: '1px solid var(--accent)',
								transition: 'all 0.15s',
							}}
							onMouseEnter={(e) => {
								const el = e.currentTarget as HTMLElement;
								el.style.background = 'var(--accent)';
								el.style.color = '#fff';
							}}
							onMouseLeave={(e) => {
								const el = e.currentTarget as HTMLElement;
								el.style.background = 'var(--accent-dim)';
								el.style.color = 'var(--accent)';
							}}
						>
							👁 Podgląd
						</button>

						<button
							onClick={() => downloadPdf(resolvedUrl, filename)}
							style={{
								all: 'unset',
								cursor: 'pointer',
								padding: '7px 14px',
								borderRadius: '8px',
								fontSize: '12px',
								fontWeight: 600,
								background: 'var(--bg-muted)',
								color: 'var(--text-secondary)',
								border: '1px solid var(--border)',
								transition: 'all 0.15s',
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
					</div>
				</div>
			</div>

			{/* Modal — renders outside card */}
			{modalOpen && (
				<PdfViewerModal
					path={path}
					label={label}
					onClose={() => setModalOpen(false)}
				/>
			)}
		</>
	);
}