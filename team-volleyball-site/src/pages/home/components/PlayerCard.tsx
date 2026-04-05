import { useNavigate } from 'react-router-dom';
import type { Player } from '../../../shared/types/player';
import {LazyImage} from "../../../shared/components/images/LazyImage.tsx";

const positionColors: Record<Player['position'], string> = {
	'Rozgrywający': '#4f8ef7',
	'Atakujący':    '#f75f4f',
	'Przyjmujący':  '#4ff7a0',
	'Libero':       '#f7c94f',
	'Środkowy':     '#b44ff7',
	'Uniwersalny':  '#f74fb4',
};

interface PlayerCardProps {
	player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
	const navigate = useNavigate();
	const color = positionColors[player.position];

	return (
		<div
			style={{
				width: '220px',
				height: '320px',
				perspective: '1000px',
				cursor: 'pointer',
				flexShrink: 0,
			}}
			onClick={() => navigate(`/zawodnik/${player.slug}`)}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => e.key === 'Enter' && navigate(`/zawodnik/${player.slug}`)}
			aria-label={`Profil zawodnika ${player.firstName} ${player.lastName}`}
			className="group"
		>
			{/* Flip wrapper */}
			<div
				style={{
					width: '100%',
					height: '100%',
					position: 'relative',
					transformStyle: 'preserve-3d',
					transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
				}}
				className="group-hover:transform-[rotateY(180deg)]"
			>
				{/* ── FRONT ── */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backfaceVisibility: 'hidden',
						WebkitBackfaceVisibility: 'hidden',
						borderRadius: '16px',
						overflow: 'hidden',
						background: 'var(--bg-surface)',
						border: `1px solid ${color}40`,
						boxShadow: `0 4px 24px ${color}15`,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{/* Photo */}
					<div
						style={{
							position: 'relative',
							height: '200px',
							background: `linear-gradient(160deg, ${color}18 0%, var(--bg-elevated) 100%)`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexShrink: 0,
							overflow: 'hidden',
						}}
					>
						{player.photoUrl ? (
							<LazyImage
								src={player.photoUrl}
								alt={`${player.firstName} ${player.lastName}`}
								style={{ width: '100%', height: '100%', objectFit: 'cover' }}
							/>
						) : (
							<div
								style={{
									width: '110px',
									height: '110px',
									borderRadius: '50%',
									background: 'var(--bg-muted)',
									border: `3px solid ${color}60`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: '56px',
								}}
							>
								👤
							</div>
						)}

						{/* Number badge */}
						<span
							style={{
								position: 'absolute',
								top: '10px',
								left: '10px',
								width: '32px',
								height: '32px',
								borderRadius: '50%',
								background: color + '25',
								border: `1px solid ${color}60`,
								color: color,
								fontSize: '12px',
								fontWeight: 800,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
              {player.number}
            </span>

						{/* Captain badge */}
						{player.isCaptain && (
							<span
								style={{
									position: 'absolute',
									top: '10px',
									right: '10px',
									background: '#f59e0b',
									color: '#000',
									fontSize: '10px',
									fontWeight: 800,
									padding: '3px 8px',
									borderRadius: '99px',
									letterSpacing: '0.05em',
									textTransform: 'uppercase',
									boxShadow: '0 2px 8px rgba(245,158,11,0.5)',
								}}
							>
                ©&nbsp;Kapitan
              </span>
						)}
					</div>

					{/* Info */}
					<div
						style={{
							padding: '14px',
							display: 'flex',
							flexDirection: 'column',
							gap: '6px',
							flex: 1,
						}}
					>
						<p
							style={{
								margin: 0,
								fontSize: '16px',
								fontWeight: 700,
								color: 'var(--text-primary)',
								lineHeight: 1.2,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
							}}
						>
							{player.firstName} {player.lastName}
						</p>

						<span
							style={{
								display: 'inline-block',
								fontSize: '10px',
								fontWeight: 700,
								textTransform: 'uppercase',
								letterSpacing: '0.08em',
								color: color,
								background: color + '18',
								padding: '2px 8px',
								borderRadius: '99px',
								alignSelf: 'flex-start',
							}}
						>
              {player.position}
            </span>

						<p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', marginTop: 'auto' }}>
							{player.seasonsInTeam}{' '}
							{player.seasonsInTeam === 1 ? 'sezon' : 'sezony'} w drużynie
						</p>
					</div>
				</div>

				{/* ── BACK ── */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backfaceVisibility: 'hidden',
						WebkitBackfaceVisibility: 'hidden',
						transform: 'rotateY(180deg)',
						borderRadius: '16px',
						overflow: 'hidden',
						background: `linear-gradient(160deg, ${color}22 0%, var(--bg-surface) 100%)`,
						border: `1px solid ${color}60`,
						boxShadow: `0 8px 32px ${color}25`,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '12px',
						padding: '20px',
						textAlign: 'center',
					}}
				>
					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', width: '100%' }}>
						{[
							{ label: 'Wzrost', value: `${player.height} cm` },
							{ label: 'Waga',   value: `${player.weight} kg` },
							{ label: 'Wiek',   value: `${player.age} lat` },
							{ label: 'Nr',     value: `#${player.number}` },
						].map((s) => (
							<div
								key={s.label}
								style={{
									background: 'var(--bg-elevated)',
									borderRadius: '10px',
									padding: '8px 4px',
									border: '1px solid var(--border-muted)',
								}}
							>
								<p style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
									{s.value}
								</p>
								<p style={{ margin: 0, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginTop: '2px' }}>
									{s.label}
								</p>
							</div>
						))}
					</div>

					<p
						style={{
							margin: 0,
							fontSize: '11px',
							color: 'var(--text-secondary)',
							lineHeight: 1.5,
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
						}}
					>
						{player.bio}
					</p>

					<div
						style={{
							marginTop: '4px',
							padding: '8px 20px',
							borderRadius: '99px',
							background: color,
							color: '#fff',
							fontSize: '12px',
							fontWeight: 700,
							boxShadow: `0 4px 16px ${color}50`,
						}}
					>
						Zobacz profil →
					</div>
				</div>
			</div>
		</div>
	);
}