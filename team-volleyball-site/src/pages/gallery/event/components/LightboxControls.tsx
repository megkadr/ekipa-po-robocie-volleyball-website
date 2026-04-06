interface LightboxControlsProps {
	onClose: () => void;
	onPrev: () => void;
	onNext: () => void;
	hasPrev: boolean;
	hasNext: boolean;
	current: number;
	total: number;
}

const btnBase: React.CSSProperties = {
	all: 'unset',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '44px',
	height: '44px',
	borderRadius: '50%',
	background: 'rgba(255,255,255,0.1)',
	border: '1px solid rgba(255,255,255,0.18)',
	backdropFilter: 'blur(8px)',
	color: '#fff',
	fontSize: '20px',
	transition: 'background 0.15s',
	flexShrink: 0,
};

export function LightboxControls({
									 onClose, onPrev, onNext, hasPrev, hasNext, current, total,
								 }: LightboxControlsProps) {
	return (
		<>
			{/* Close */}
			<button
				onClick={onClose}
				aria-label="Zamknij"
				style={{
					...btnBase,
					position: 'absolute',
					top: '16px',
					right: '16px',
					zIndex: 10,
					fontSize: '22px',
				}}
				onMouseEnter={(e) => {
					(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)';
				}}
				onMouseLeave={(e) => {
					(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
				}}
			>
				✕
			</button>

			{/* Prev */}
			<button
				onClick={onPrev}
				disabled={!hasPrev}
				aria-label="Poprzednie zdjęcie"
				style={{
					...btnBase,
					position: 'absolute',
					left: '16px',
					top: '50%',
					transform: 'translateY(-50%)',
					opacity: hasPrev ? 1 : 0.3,
					cursor: hasPrev ? 'pointer' : 'default',
				}}
				onMouseEnter={(e) => {
					if (hasPrev) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)';
				}}
				onMouseLeave={(e) => {
					(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
				}}
			>
				‹
			</button>

			{/* Next */}
			<button
				onClick={onNext}
				disabled={!hasNext}
				aria-label="Następne zdjęcie"
				style={{
					...btnBase,
					position: 'absolute',
					right: '16px',
					top: '50%',
					transform: 'translateY(-50%)',
					opacity: hasNext ? 1 : 0.3,
					cursor: hasNext ? 'pointer' : 'default',
				}}
				onMouseEnter={(e) => {
					if (hasNext) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)';
				}}
				onMouseLeave={(e) => {
					(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)';
				}}
			>
				›
			</button>

			{/* Counter */}
			<div
				style={{
					position: 'absolute',
					bottom: '16px',
					left: '50%',
					transform: 'translateX(-50%)',
					fontSize: '13px',
					color: 'rgba(255,255,255,0.7)',
					background: 'rgba(0,0,0,0.4)',
					padding: '4px 14px',
					borderRadius: '99px',
					backdropFilter: 'blur(8px)',
					pointerEvents: 'none',
				}}
			>
				{current + 1} / {total}
			</div>
		</>
	);
}