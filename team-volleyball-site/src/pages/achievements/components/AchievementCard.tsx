import { useNavigate } from 'react-router-dom';
import type { Achievement } from '../types/achievementTypes';
import {
	achievementTypeColors,
	achievementTypeLabels,
	formatAchievementDate,
} from '../helpers/achievementsHelpers';
import { players } from '../../../shared/data/players';

interface AchievementCardProps {
	achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
	const navigate = useNavigate();
	const color    = achievementTypeColors[achievement.type];
	const label    = achievementTypeLabels[achievement.type];

	const player = achievement.playerSlug
		? players.find((p) => p.slug === achievement.playerSlug)
		: null;

	return (
		<div
			style={{
				display: 'flex',
				gap: '16px',
				padding: '18px 20px',
				borderRadius: '14px',
				border: `1px solid ${color}30`,
				background: `linear-gradient(135deg, ${color}08 0%, var(--bg-surface) 100%)`,
				transition: 'border-color 0.2s, box-shadow 0.2s',
			}}
			onMouseEnter={(e) => {
				const el = e.currentTarget as HTMLElement;
				el.style.borderColor = color + '60';
				el.style.boxShadow   = `0 4px 20px ${color}15`;
			}}
			onMouseLeave={(e) => {
				const el = e.currentTarget as HTMLElement;
				el.style.borderColor = color + '30';
				el.style.boxShadow   = 'none';
			}}
		>
			{/* Icon */}
			<div
				style={{
					width: '52px',
					height: '52px',
					borderRadius: '12px',
					background: color + '18',
					border: `1px solid ${color}40`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '26px',
					flexShrink: 0,
				}}
			>
				{achievement.icon}
			</div>

			{/* Content */}
			<div style={{ flex: 1, minWidth: 0 }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
					<span
						style={{
							fontSize: '9px',
							fontWeight: 700,
							textTransform: 'uppercase',
							letterSpacing: '0.08em',
							color,
							background: color + '18',
							padding: '2px 8px',
							borderRadius: '99px',
							border: `1px solid ${color}30`,
						}}
					>
						{label}
					</span>
					<span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
						{formatAchievementDate(achievement.date)}
					</span>
				</div>

				<p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
					{achievement.title}
				</p>

				<p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
					{achievement.description}
				</p>

				{/* Player link for MVP */}
				{player && (
					<button
						onClick={() => navigate(`/zawodnik/${player.slug}`)}
						style={{
							all: 'unset',
							cursor: 'pointer',
							display: 'inline-flex',
							alignItems: 'center',
							gap: '5px',
							marginTop: '8px',
							fontSize: '12px',
							fontWeight: 600,
							color: 'var(--accent)',
						}}
					>
						👤 {player.firstName} {player.lastName} →
					</button>
				)}

				{/* Event link */}
				{achievement.eventSlug && (
					<button
						onClick={() => navigate(`/terminarz/${achievement.eventSlug}`)}
						style={{
							all: 'unset',
							cursor: 'pointer',
							display: 'inline-flex',
							alignItems: 'center',
							gap: '5px',
							marginTop: player ? '4px' : '8px',
							fontSize: '12px',
							fontWeight: 600,
							color: 'var(--text-muted)',
							transition: 'color 0.15s',
						}}
						onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
						onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
					>
						📅 Zobacz wydarzenie →
					</button>
				)}
			</div>
		</div>
	);
}