const CAPTAIN_PHONE = '+48 797 375 929';
const CAPTAIN_EMAIL = 'arturrezmer2@onet.pl';
const CAPTAIN_NAME  = 'Artur Rezmer';

export default function ContactPage() {
	return (
		<div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 16px' }}>
			{/* H1 */}
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
          Skontaktuj się
        </span>
				<h1
					style={{
						fontSize: '36px',
						fontWeight: 800,
						color: 'var(--text-primary)',
						margin: '4px 0 8px',
						lineHeight: 1.2,
					}}
				>
					Kontakt
				</h1>
				<p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
					Chcesz dołączyć do drużyny lub masz pytania? Napisz lub zadzwoń do
					kapitana.
				</p>
			</div>

			{/* Card — kapitan */}
			<div
				style={{
					borderRadius: '20px',
					border: '1px solid var(--border)',
					background: 'var(--bg-surface)',
					overflow: 'hidden',
					marginBottom: '24px',
				}}
			>
				{/* Nagłówek sekcji */}
				<div
					style={{
						padding: '20px 24px 16px',
						borderBottom: '1px solid var(--border)',
						background: 'var(--bg-elevated)',
					}}
				>
					{/* H2 — sekcja wewnątrz strony */}
					<h2
						style={{
							margin: 0,
							fontSize: '14px',
							fontWeight: 700,
							color: 'var(--text-primary)',
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
						}}
					>
            <span
				style={{
					fontSize: '10px',
					fontWeight: 800,
					padding: '2px 8px',
					borderRadius: '99px',
					background: '#f59e0b',
					color: '#000',
					textTransform: 'uppercase',
					letterSpacing: '0.05em',
				}}
			>
              Kapitan
            </span>
						{CAPTAIN_NAME}
					</h2>
				</div>

				{/* Kontakty */}
				<div style={{ padding: '8px 0' }}>
					{/* Telefon */}
					<a
						href={`tel:${CAPTAIN_PHONE.replace(/\s/g, '')}`}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '16px',
							padding: '16px 24px',
							textDecoration: 'none',
							borderBottom: '1px solid var(--border-muted)',
							transition: 'background 0.15s',
							cursor: 'pointer',
						}}
						onMouseEnter={(e) =>
							((e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)')
						}
						onMouseLeave={(e) =>
							((e.currentTarget as HTMLElement).style.background = 'transparent')
						}
					>
						<div
							style={{
								width: '44px',
								height: '44px',
								borderRadius: '12px',
								background: 'rgba(79, 142, 247, 0.15)',
								border: '1px solid rgba(79, 142, 247, 0.3)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '20px',
								flexShrink: 0,
							}}
						>
							📞
						</div>
						<div>
							{/* H3 */}
							<h3
								style={{
									margin: 0,
									fontSize: '11px',
									fontWeight: 600,
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
									color: 'var(--text-muted)',
								}}
							>
								Telefon
							</h3>
							<p
								style={{
									margin: '3px 0 0',
									fontSize: '16px',
									fontWeight: 600,
									color: 'var(--accent)',
								}}
							>
								{CAPTAIN_PHONE}
							</p>
						</div>
						<span
							style={{
								marginLeft: 'auto',
								fontSize: '18px',
								color: 'var(--text-muted)',
							}}
						>
              →
            </span>
					</a>

					{/* Email */}
					<a
						href={`mailto:${CAPTAIN_EMAIL}`}
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '16px',
							padding: '16px 24px',
							textDecoration: 'none',
							transition: 'background 0.15s',
							cursor: 'pointer',
						}}
						onMouseEnter={(e) =>
							((e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)')
						}
						onMouseLeave={(e) =>
							((e.currentTarget as HTMLElement).style.background = 'transparent')
						}
					>
						<div
							style={{
								width: '44px',
								height: '44px',
								borderRadius: '12px',
								background: 'rgba(79, 247, 160, 0.12)',
								border: '1px solid rgba(79, 247, 160, 0.25)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '20px',
								flexShrink: 0,
							}}
						>
							✉️
						</div>
						<div>
							<h3
								style={{
									margin: 0,
									fontSize: '11px',
									fontWeight: 600,
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
									color: 'var(--text-muted)',
								}}
							>
								Email
							</h3>
							<p
								style={{
									margin: '3px 0 0',
									fontSize: '16px',
									fontWeight: 600,
									color: 'var(--accent)',
								}}
							>
								{CAPTAIN_EMAIL}
							</p>
						</div>
						<span
							style={{
								marginLeft: 'auto',
								fontSize: '18px',
								color: 'var(--text-muted)',
							}}
						>
              →
            </span>
					</a>
				</div>
			</div>

			{/* Info note */}
			<div
				style={{
					borderRadius: '12px',
					padding: '16px 20px',
					background: 'var(--accent-dim)',
					border: '1px solid var(--accent)',
					display: 'flex',
					alignItems: 'flex-start',
					gap: '12px',
				}}
			>
				<span style={{ fontSize: '20px', flexShrink: 0, marginTop: '1px' }}>💬</span>
				<p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
					Drużyna nie posiada jeszcze kont w mediach społecznościowych. Wszelkie
					pytania kieruj bezpośrednio do kapitana — najszybciej odpowiada przez
					telefon lub email.
				</p>
			</div>
		</div>
	);
}