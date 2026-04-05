import type { Player } from '../../../shared/types/player';
import { FifaCard } from './FifaCard';

interface PlayersGridProps {
	players: Player[];
}

export function PlayersGrid({ players }: PlayersGridProps) {
	if (players.length === 0) {
		return (
			<div
				style={{
					textAlign: 'center',
					padding: '60px 20px',
					color: 'var(--text-muted)',
				}}
			>
				<span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>
					🏐
				</span>
				Brak zawodników spełniających podane kryteria.
			</div>
		);
	}

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
				gap: '16px',
			}}
		>
			{players.map((player) => (
				<FifaCard key={player.id} player={player} />
			))}
		</div>
	);
}