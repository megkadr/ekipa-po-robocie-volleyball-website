interface PlayersCountProps {
	count: number;
}

export function PlayersCount({ count }: PlayersCountProps) {
	const label = count === 1 ? 'zawodnik' : 'zawodników';

	return (
		<p
			style={{
				fontSize: '13px',
				color: 'var(--text-muted)',
				marginBottom: '20px',
			}}
		>
			Znaleziono{' '}
			<strong style={{ color: 'var(--text-primary)' }}>{count}</strong>{' '}
			{label}
		</p>
	);
}