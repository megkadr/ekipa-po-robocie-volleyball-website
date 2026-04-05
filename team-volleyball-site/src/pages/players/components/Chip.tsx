interface ChipProps {
	label: string;
	active: boolean;
	color?: string;
	onClick: () => void;
}

export function Chip({ label, active, color, onClick }: ChipProps) {
	const accent = color ?? 'var(--accent)';

	return (
		<button
			onClick={onClick}
			style={{
				all: 'unset',
				cursor: 'pointer',
				display: 'inline-flex',
				alignItems: 'center',
				padding: '5px 14px',
				borderRadius: '99px',
				fontSize: '12px',
				fontWeight: 600,
				border: `1px solid ${active ? accent : 'var(--border)'}`,
				background: active ? accent + '20' : 'var(--bg-elevated)',
				color: active ? accent : 'var(--text-secondary)',
				transition: 'all 0.15s ease',
				whiteSpace: 'nowrap',
			}}
		>
			{label}
		</button>
	);
}