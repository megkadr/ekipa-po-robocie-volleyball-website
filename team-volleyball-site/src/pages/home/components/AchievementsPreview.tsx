import { useNavigate } from 'react-router-dom';
import { achievements } from '../../achievements/data/achievements.ts';
import {
	sortAchievementsByDate,
	achievementTypeColors,
	achievementTypeLabels,
	formatAchievementDate,
} from '../../achievements/helpers/achievementsHelpers.ts';
import { players } from '../../../shared/data/players';

const MAX_PREVIEW = 3;

export function AchievementsPreview() {
	const navigate = useNavigate();
	const top = sortAchievementsByDate(achievements).slice(0, MAX_PREVIEW);

	if (top.length === 0) return null;

	return (
		<section style={{ padding: '64px 16px' }}>
			<div style={{ maxWidth: '1024px', margin: '0 auto' }}>
				{/* Section header */}
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'space-between',
						marginBottom: '32px',
						flexWrap: 'wrap',
						gap: '12px',
					}}
				>
					<div>
						<span
							style={{
								fontSize: '11px',
								textTransform: 'uppercase',
								letterSpacing: '0.1em',
								fontWeight: 600,
								color: 'var(--accent)',
							}}
						>
							Sukcesy
						</span>
						{/* H2 */}
						<h2
							style={{
								fontSize: 'clamp(22px, 4vw, 30px)',
								fontWeight: 800,
								color: 'var(--text-primary)',
								margin: '4px 0 0',
								lineHeight: 1.2,
							}}
						>
							Nasze osiągnięcia
						</h2>
					</div>

					<button
						onClick={() => navigate('/osiagniecia')}
						style={{
							all: 'unset',
							cursor: 'pointer',
							fontSize: '13px',
							fontWeight: 600,
							color: 'var(--accent)',
							display: 'flex',
							alignItems: 'center',
							gap: '4px',
							transition: 'opacity 0.15s',
						}}
						onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.72')}
						onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
					>
						Zobacz wszystkie →
					</button>
				</div>

				{/* Cards */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
						gap: '14px',
					}}
				>
					{top.map((achievement) => {
						const color  = achievementTypeColors[achievement.type];
						const label  = achievementTypeLabels[achievement.type];
						const player = achievement.playerSlug
							? players.find((p) => p.slug === achievement.playerSlug)
							: null;

						return (
							<div
								key={achievement.id}
								onClick={() =>
									achievement.eventSlug
										? navigate(`/terminarz/${achievement.eventSlug}`)
										: navigate('/osiagniecia')
								}
								role="button"
								tabIndex={0}
								onKeyDown={(e) =>
									e.key === 'Enter' &&
									(achievement.eventSlug
										? navigate(`/terminarz/${achievement.eventSlug}`)
										: navigate('/osiagniecia'))
								}
								style={{
									cursor: 'pointer',
									display: 'flex',
									gap: '14px',
									padding: '16px',
									borderRadius: '14px',
									border: `1px solid ${color}30`,
									background: `linear-gradient(135deg, ${color}08 0%, var(--bg-surface) 100%)`,
									transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
								}}
								onMouseEnter={(e) => {
									const el = e.currentTarget as HTMLElement;
									el.style.borderColor = color + '60';
									el.style.boxShadow   = `0 4px 20px ${color}15`;
									el.style.transform   = 'translateY(-2px)';
								}}
								onMouseLeave={(e) => {
									const el = e.currentTarget as HTMLElement;
									el.style.borderColor = color + '30';
									el.style.boxShadow   = 'none';
									el.style.transform   = 'translateY(0)';
								}}
							>
								{/* Icon */}
								<div
									style={{
										width: '46px',
										height: '46px',
										borderRadius: '11px',
										background: color + '18',
										border: `1px solid ${color}35`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '22px',
										flexShrink: 0,
									}}
								>
									{achievement.icon}
								</div>

								{/* Text */}
								<div style={{ flex: 1, minWidth: 0 }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
										<span
											style={{
												fontSize: '9px',
												fontWeight: 700,
												textTransform: 'uppercase',
												letterSpacing: '0.08em',
												color,
												background: color + '18',
												padding: '1px 7px',
												borderRadius: '99px',
												border: `1px solid ${color}30`,
											}}
										>
											{label}
										</span>
										<span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
											{formatAchievementDate(achievement.date)}
										</span>
									</div>

									<p
										style={{
											margin: 0,
											fontSize: '14px',
											fontWeight: 700,
											color: 'var(--text-primary)',
											lineHeight: 1.3,
											overflowWrap: 'break-word',
										}}
									>
										{achievement.title}
									</p>

									{player && (
										<p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
											👤 {player.firstName} {player.lastName}
										</p>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}