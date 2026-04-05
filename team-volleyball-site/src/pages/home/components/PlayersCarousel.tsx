import { InfiniteMovingCards } from '../../../shared/components/ui/InfiniteMovingCards';
import { PlayerCard } from './PlayerCard';
import { players } from '../../../shared/data/players';
import type { Player } from '../../../shared/types/player';
import { useNavigate } from 'react-router-dom';

export function PlayersCarousel() {
	const navigate = useNavigate();

	return (
		<section className="py-16">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
				<div className="flex flex-col items-center text-center gap-3">
          <span
			  className="text-xs uppercase tracking-widest font-semibold"
			  style={{ color: 'var(--accent)' }}
		  >
            Poznaj nas
          </span>

					{/* H2 */}
					<h2
						className="text-3xl md:text-4xl font-extrabold"
						style={{ color: 'var(--text-primary)' }}
					>
						Zawodnicy drużyny
					</h2>

					<p
						className="max-w-lg text-base"
						style={{ color: 'var(--text-secondary)' }}
					>
						Najedź na kartę, aby zobaczyć statystyki. Kliknij, aby przejść do
						pełnego profilu.
					</p>

					<button
						onClick={() => navigate('/zawodnicy')}
						style={{
							marginTop: '8px',
							padding: '8px 20px',
							borderRadius: '99px',
							fontSize: '13px',
							fontWeight: 600,
							border: '1px solid var(--accent)',
							color: 'var(--accent)',
							background: 'var(--accent-dim)',
							cursor: 'pointer',
							transition: 'background 0.15s, color 0.15s',
						}}
						onMouseEnter={(e) => {
							const el = e.currentTarget;
							el.style.background = 'var(--accent)';
							el.style.color = '#fff';
						}}
						onMouseLeave={(e) => {
							const el = e.currentTarget;
							el.style.background = 'var(--accent-dim)';
							el.style.color = 'var(--accent)';
						}}
					>
						Zobacz wszystkich zawodników →
					</button>
				</div>
			</div>

			<InfiniteMovingCards<Player>
				items={players}
				renderItem={(player) => <PlayerCard player={player} />}
				direction="left"
				speed="slow"
				pauseOnHover
				gap={24}
			/>
		</section>
	);
}