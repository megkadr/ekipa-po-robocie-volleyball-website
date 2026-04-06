import type { LeagueResult } from '../types/scheduleTypes';
import { formatPlacement, getPlacementColor } from '../helpers/scheduleHelpers';
import { players } from '../../../shared/data/players';

interface LeagueResultSectionProps {
	result: LeagueResult;
}

export function LeagueResultSection({ result }: LeagueResultSectionProps) {
	const placementColor = getPlacementColor(result.place);

	const mvpPlayer = result.mvpPlayerSlug
		? players.find((p) => p.slug === result.mvpPlayerSlug)
		: null;

	const totalMatches = result.wins + result.losses;
	const winRate      = totalMatches > 0 ? Math.round((result.wins / totalMatches) * 100) : 0;

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
				<p style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: placementColor }}>
					{formatPlacement(result.place, result.totalTeams)}
				</p>
			</div>

			{/* W/L stats */}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					gap: '10px',
					marginBottom: '20px',
				}}
			>
				{[
					{ label: 'Wygrane',     value: result.wins,    color: '#4ff7a0' },
					{ label: 'Przegrane',   value: result.losses,  color: '#f75f4f' },
					{ label: 'Skuteczność', value: `${winRate}%`,  color: 'var(--accent)' },
				].map((s) => (
					<div
						key={s.label}
						style={{
							padding: '14px',
							borderRadius: '10px',
							background: 'var(--bg-elevated)',
							border: '1px solid var(--border-muted)',
							textAlign: 'center',
						}}
					>
						<p style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: s.color }}>
							{s.value}
						</p>
						<p style={{ margin: '4px 0 0', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>
							{s.label}
						</p>
					</div>
				))}
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
						marginBottom: '16px',
					}}
				>
					<span style={{ fontSize: '20px' }}>⭐</span>
					<div>
						<p style={{ margin: 0, fontSize: '11px', fontWeight: 600, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
							MVP Sezonu
						</p>
						<p style={{ margin: '2px 0 0', fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
							{mvpPlayer.firstName} {mvpPlayer.lastName}
						</p>
					</div>
				</div>
			)}

			{result.notes && (
				<p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }}>
					{result.notes}
				</p>
			)}
		</div>
	);
}