export function PlayersHeader() {
	return (
		<div style={{ marginBottom: '40px' }}>
			<span
				style={{
					fontSize: '11px',
					textTransform: 'uppercase',
					letterSpacing: '0.1em',
					fontWeight: 600,
					color: 'var(--accent)',
				}}
			>
				Drużyna
			</span>
			{/* H1 — jedyny na stronie */}
			<h1
				style={{
					fontSize: '36px',
					fontWeight: 800,
					color: 'var(--text-primary)',
					margin: '4px 0 8px',
					lineHeight: 1.2,
				}}
			>
				Zawodnicy
			</h1>
			<p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
				Poznaj wszystkich zawodników Ekipy Po Robocie. Kliknij kartę, aby
				zobaczyć pełny profil.
			</p>
		</div>
	);
}