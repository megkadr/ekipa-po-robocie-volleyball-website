import type { TournamentResult } from '../types/scheduleTypes';
import { formatPlacement, getPlacementColor } from '../helpers/scheduleHelpers';
import { players } from '../../../shared/data/players';

interface TournamentResultSectionProps {
	result: TournamentResult;
}

export function TournamentResultSection({ result }: TournamentResultSectionProps) {
	const placementColor = getPlacementColor(result.place);

	const mvpPlayer = result.mvpPlayerSlug
		? players.find((p) => p.slug === result.mvpPlayerSlug)
		: null;

	return (
		<div>
			{/* Placement */}
			<div
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					gap: '10px',
					padding: '12px 20px',
					borderRadius: '12px',
					background: placementColor + '15',
					border: `1px solid ${placementColor}40`,
					marginBottom: '24px',
				}}
			>
				<span style={{ fontSize: '28px' }}>
					{result.place === 1 ? '🥇' : result.place === 2 ? '🥈' : result.place === 3 ? '🥉' : '🏆'}
				</span>
				<div>
					<p style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: placementColor }}>
						{formatPlacement(result.place, result.totalTeams)}
					</p>
				</div>
			</div>

			{/* MVP */}
			{mvpPlayer && (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '10px',
						padding: '12px 16px',
						borderRadius: '10px',
						background: '#f59e0b18',
						border: '1px solid #f59e0b40',
						marginBottom: '24px',
					}}
				>
					<span style={{ fontSize: '20px' }}>⭐</span>
					<div>
						<p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
							MVP Turnieju
						</p>
						<p style={{ margin: '2px 0 0', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
							{mvpPlayer.firstName} {mvpPlayer.lastName}
						</p>
					</div>
				</div>
			)}

			{/* Matches */}
			{result.matches.length > 0 && (
				<div>
					<h3
						style={{
							fontSize: '11px',
							fontWeight: 700,
							textTransform: 'uppercase',
							letterSpacing: '0.1em',
							color: 'var(--accent)',
							margin: '0 0 12px',
						}}
					>
						Mecze
					</h3>

					<div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						{result.matches.map((match, idx) => {
							const won = match.sets[0] > match.sets[1];
							const matchColor = won ? '#4ff7a0' : '#f75f4f';

							return (
								<div
									key={idx}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '12px',
										padding: '10px 14px',
										borderRadius: '10px',
										background: 'var(--bg-elevated)',
										border: `1px solid ${matchColor}30`,
									}}
								>
									{/* W/L */}
									<span
										style={{
											width: '28px',
											height: '28px',
											borderRadius: '6px',
											background: matchColor + '20',
											color: matchColor,
											fontSize: '11px',
											fontWeight: 800,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											flexShrink: 0,
										}}
									>
										{won ? 'W' : 'P'}
									</span>

									{/* Opponent */}
									<p style={{ margin: 0, flex: 1, fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
										vs {match.opponent}
									</p>

									{/* Sets */}
									<span
										style={{
											fontSize: '15px',
											fontWeight: 800,
											color: matchColor,
										}}
									>
										{match.sets[0]}:{match.sets[1]}
									</span>

									{/* Set scores */}
									{match.setScores && (
										<span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
											({match.setScores.join(', ')})
										</span>
									)}
								</div>
							);
						})}
					</div>
				</div>
			)}

			{/* Notes */}
			{result.notes && (
				<p
					style={{
						marginTop: '16px',
						fontSize: '13px',
						color: 'var(--text-secondary)',
						fontStyle: 'italic',
						lineHeight: 1.6,
					}}
				>
					{result.notes}
				</p>
			)}
		</div>
	);
}