import { achievements } from './data/achievements';
import { sortAchievementsByDate } from './helpers/achievementsHelpers';
import { AchievementCard } from './components/AchievementCard';

export default function AchievementsPage() {
	const sorted = sortAchievementsByDate(achievements);

	return (
		<div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 16px' }}>
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
					Sukcesy
				</span>
				{/* H1 */}
				<h1
					style={{
						fontSize: '36px',
						fontWeight: 800,
						color: 'var(--text-primary)',
						margin: '4px 0 8px',
						lineHeight: 1.2,
					}}
				>
					Osiągnięcia
				</h1>
				<p style={{ color: 'var(--text-secondary)', fontSize: '15px', margin: 0 }}>
					Nasze sukcesy — miejsca na podium, tytuły MVP i inne wyróżnienia
					zdobyte przez Ekipę Po Robocie.
				</p>
			</div>

			{sorted.length === 0 ? (
				<div
					style={{
						textAlign: 'center',
						padding: '80px 20px',
						color: 'var(--text-muted)',
					}}
				>
					<span style={{ fontSize: '56px', display: 'block', marginBottom: '16px' }}>🏆</span>
					<p style={{ margin: 0 }}>
						Osiągnięcia pojawią się tutaj po zakończeniu turniejów i lig.
					</p>
				</div>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
					{sorted.map((achievement) => (
						<AchievementCard key={achievement.id} achievement={achievement} />
					))}
				</div>
			)}
		</div>
	);
}