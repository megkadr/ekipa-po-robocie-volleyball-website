import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import findPlayerBySlug from "../../shared/helpers/players/findPlayerBySlug.ts";
import {LazyImage} from "../../shared/components/images/LazyImage.tsx";

const positionColors: Record<string, string> = {
	'Rozgrywający': '#4f8ef7',
	'Atakujący':    '#f75f4f',
	'Przyjmujący':  '#4ff7a0',
	'Libero':       '#f7c94f',
	'Środkowy':     '#b44ff7',
	'Uniwersalny':  '#f74fb4',
};

export default function PlayerPage() {
	const { slug } = useParams<{ slug: string }>();
	const navigate = useNavigate();

	const player = slug ? findPlayerBySlug(slug) : undefined;

	// SEO: dynamiczny <title> i <meta description>
	useEffect(() => {
		if (player) {
			document.title = `${player.firstName} ${player.lastName} — ${player.position} | Ekipa Po Robocie`;

			let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
			if (!meta) {
				meta = document.createElement('meta');
				meta.name = 'description';
				document.head.appendChild(meta);
			}
			meta.content = `Profil zawodnika ${player.firstName} ${player.lastName} — ${player.position}, numer ${player.number}. ${player.bio.slice(0, 120)}`;
		} else {
			document.title = 'Zawodnik nie znaleziony | Ekipa Po Robocie';
		}

		return () => {
			document.title = 'Ekipa Po Robocie — Amatorska drużyna siatkówki';
		};
	}, [player]);

	if (!player) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '400px',
					gap: '16px',
					padding: '32px',
					textAlign: 'center',
				}}
			>
				<span style={{ fontSize: '64px' }}>🏐</span>
				{/* H1 */}
				<h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
					Zawodnik nie został znaleziony
				</h1>
				<p style={{ color: 'var(--text-secondary)', margin: 0 }}>
					Sprawdź czy adres URL jest poprawny.
				</p>
				<button
					onClick={() => navigate('/')}
					style={{
						padding: '10px 24px',
						borderRadius: '99px',
						background: 'var(--accent)',
						color: '#fff',
						fontWeight: 600,
						fontSize: '14px',
						border: 'none',
						cursor: 'pointer',
					}}
				>
					Wróć do strony głównej
				</button>
			</div>
		);
	}

	const positionColor = positionColors[player.position] ?? 'var(--accent)';

	return (
		<div style={{ maxWidth: '768px', margin: '0 auto', padding: '48px 16px' }}>
			{/* Przycisk Powrót */}
			<button
				onClick={() => navigate(-1)}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '6px',
					marginBottom: '32px',
					fontSize: '14px',
					fontWeight: 500,
					color: 'var(--text-secondary)',
					background: 'none',
					border: 'none',
					padding: 0,
					cursor: 'pointer',
					transition: 'color 0.15s',
				}}
				onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
				onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
			>
				← Powrót
			</button>

			{/* Profile card */}
			<article
				style={{
					borderRadius: '20px',
					border: `1px solid ${positionColor}40`,
					background: 'var(--bg-surface)',
					overflow: 'hidden',
					boxShadow: `0 0 60px ${positionColor}10`,
				}}
			>
				{/* Top banner */}
				<div
					style={{
						height: '80px',
						background: `linear-gradient(135deg, ${positionColor}25, ${positionColor}08)`,
						borderBottom: `1px solid ${positionColor}30`,
					}}
				/>

				<div style={{ padding: '0 32px 40px' }}>
					{/* Avatar */}
					<div style={{ marginTop: '-40px', marginBottom: '16px' }}>
						<div
							style={{
								width: '80px',
								height: '80px',
								borderRadius: '50%',
								border: `3px solid ${positionColor}`,
								overflow: 'hidden',
								background: 'var(--bg-elevated)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '36px',
							}}
						>
							{player.photoUrl ? (
								<LazyImage
									src={player.photoUrl}
									alt={`Zdjęcie ${player.firstName} ${player.lastName}`}
									style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								/>
							) : (
								'👤'
							)}
						</div>
					</div>

					{/* H1 */}
					<h1
						style={{
							fontSize: '28px',
							fontWeight: 800,
							color: 'var(--text-primary)',
							margin: '0 0 8px',
							lineHeight: 1.2,
						}}
					>
						{player.firstName} {player.lastName}
					</h1>

					<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span
				style={{
					fontSize: '11px',
					fontWeight: 700,
					textTransform: 'uppercase',
					letterSpacing: '0.08em',
					color: positionColor,
					background: positionColor + '18',
					padding: '3px 10px',
					borderRadius: '99px',
				}}
			>
              {player.position}
            </span>
						<span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              #{player.number}
            </span>
						{player.isCaptain && (
							<span
								style={{
									fontSize: '11px',
									fontWeight: 800,
									padding: '3px 10px',
									borderRadius: '99px',
									background: '#f59e0b',
									color: '#000',
									textTransform: 'uppercase',
									letterSpacing: '0.05em',
								}}
							>
                © Kapitan
              </span>
						)}
					</div>

					{/* Stats */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, 1fr)',
							gap: '12px',
							marginBottom: '32px',
						}}
					>
						{[
							{ label: 'Wzrost', value: `${player.height} cm` },
							{ label: 'Waga',   value: `${player.weight} kg` },
							{ label: 'Wiek',   value: `${player.age} lat` },
						].map((s) => (
							<div
								key={s.label}
								style={{
									borderRadius: '12px',
									padding: '14px 10px',
									textAlign: 'center',
									background: 'var(--bg-elevated)',
									border: '1px solid var(--border-muted)',
								}}
							>
								<p style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
									{s.value}
								</p>
								<p style={{ margin: '4px 0 0', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>
									{s.label}
								</p>
							</div>
						))}
					</div>

					{/* H2 — sekcje wewnątrz artykułu o zawodniku */}
					<section style={{ marginBottom: '24px' }}>
						<h2
							style={{
								fontSize: '11px',
								fontWeight: 700,
								textTransform: 'uppercase',
								letterSpacing: '0.1em',
								color: positionColor,
								margin: '0 0 10px',
							}}
						>
							O zawodniku
						</h2>
						<p style={{ margin: 0, fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
							{/* TODO: bio */}
							{player.bio}
						</p>
					</section>

					<section style={{ marginBottom: '24px' }}>
						<h2
							style={{
								fontSize: '11px',
								fontWeight: 700,
								textTransform: 'uppercase',
								letterSpacing: '0.1em',
								color: positionColor,
								margin: '0 0 10px',
							}}
						>
							Zainteresowania
						</h2>
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
							{/* TODO: hobby */}
							{player.hobbies.map((hobby) => (
								<span
									key={hobby}
									style={{
										padding: '5px 14px',
										borderRadius: '99px',
										fontSize: '13px',
										background: 'var(--bg-elevated)',
										border: '1px solid var(--border)',
										color: 'var(--text-secondary)',
									}}
								>
                  {hobby}
                </span>
							))}
						</div>
					</section>

					{player.idol && (
						<section style={{ marginBottom: '24px' }}>
							<h2
								style={{
									fontSize: '11px',
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: '0.1em',
									color: positionColor,
									margin: '0 0 10px',
								}}
							>
								Ulubiony zawodnik
							</h2>
							<p style={{ margin: 0, fontSize: '15px', color: 'var(--text-secondary)' }}>
								{/* TODO: idol */}
								{player.idol}
							</p>
						</section>
					)}

					{/* Staż */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '12px',
							padding: '14px 18px',
							borderRadius: '12px',
							background: 'var(--accent-dim)',
							border: '1px solid var(--accent)',
						}}
					>
						<span style={{ fontSize: '24px' }}>🏐</span>
						<p style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
							{/* TODO: staż */}
							{player.seasonsInTeam}{' '}
							{player.seasonsInTeam === 1 ? 'sezon' : 'sezony'} w Ekipie Po Robocie
						</p>
					</div>
				</div>
			</article>
		</div>
	);
}