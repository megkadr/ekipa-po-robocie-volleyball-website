import { useNavigate } from 'react-router-dom';
import type { Player } from '../../../shared/types/player';
import { positionColors } from '../helpers/playersHelpers';
import {LazyImage} from "../../../shared/components/images/LazyImage.tsx";

interface FifaCardProps {
	player: Player;
}

export function FifaCard({ player }: FifaCardProps) {
	const navigate = useNavigate();
	const color = positionColors[player.position];

	const handleClick = () => {
		navigate(`/zawodnik/${player.slug}`);
	};

	return (
		<button
			onClick={handleClick}
			style={{
				all: 'unset',
				cursor: 'pointer',
				display: 'block',
				width: '100%',
			}}
		>
			<div
				style={{
					position: 'relative',
					borderRadius: '16px',
					overflow: 'hidden',
					border: `1px solid ${color}40`,
					background: `linear-gradient(160deg, ${color}18 0%, var(--bg-surface) 50%, var(--bg-elevated) 100%)`,
					transition: 'transform 0.2s ease, box-shadow 0.2s ease',
					boxShadow: `0 2px 12px ${color}10`,
				}}
				onMouseEnter={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.transform = 'translateY(-4px)';
					el.style.boxShadow = `0 12px 32px ${color}30`;
				}}
				onMouseLeave={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.transform = 'translateY(0)';
					el.style.boxShadow = `0 2px 12px ${color}10`;
				}}
			>
				{/* Top accent stripe */}
				<div
					style={{
						height: '5px',
						background: `linear-gradient(90deg, ${color}, ${color}40)`,
					}}
				/>

				<div style={{ padding: '16px' }}>
					{/* Photo + name row */}
					<div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
						{/* Photo */}
						<div
							style={{
								width: '72px',
								height: '72px',
								borderRadius: '12px',
								background: `linear-gradient(135deg, ${color}25, var(--bg-muted))`,
								border: `2px solid ${color}50`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: '36px',
								flexShrink: 0,
								overflow: 'hidden',
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

						{/* Name + badges */}
						<div style={{ flex: 1, minWidth: 0 }}>
							<div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
								<span
									style={{
										fontSize: '15px',
										fontWeight: 800,
										color: 'var(--text-primary)',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										maxWidth: '120px',
										display: 'block',
									}}
								>
									{player.firstName} {player.lastName}
								</span>

								{player.isCaptain && (
									<span
										style={{
											fontSize: '9px',
											fontWeight: 800,
											padding: '2px 7px',
											borderRadius: '99px',
											background: '#f59e0b',
											color: '#000',
											letterSpacing: '0.05em',
											textTransform: 'uppercase',
											flexShrink: 0,
										}}
									>
										Kapitan
									</span>
								)}
							</div>

							<span
								style={{
									display: 'inline-block',
									marginTop: '5px',
									fontSize: '10px',
									fontWeight: 700,
									textTransform: 'uppercase',
									letterSpacing: '0.07em',
									color: color,
									background: color + '18',
									padding: '2px 8px',
									borderRadius: '99px',
								}}
							>
								{player.position}
							</span>

							<p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>
								#{player.number}
							</p>
						</div>
					</div>

					{/* Divider */}
					<div style={{ height: '1px', background: 'var(--border-muted)', margin: '14px 0' }} />

					{/* Stats */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(4, 1fr)',
							gap: '6px',
							textAlign: 'center',
						}}
					>
						{[
							{ label: 'Wzrost', value: `${player.height} cm` },
							{ label: 'Waga',   value: `${player.weight} kg` },
							{ label: 'Wiek',   value: `${player.age} l.` },
							{ label: 'Staż',   value: `${player.seasonsInTeam} s.` },
						].map((s) => (
							<div key={s.label}>
								<p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
									{s.value}
								</p>
								<p style={{ margin: '2px 0 0', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
									{s.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</button>
	);
}