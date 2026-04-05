import { useState } from 'react';
import { players } from '../../shared/data/players';
import type { Player } from '../../shared/types/player';
import { sortPlayers, type SortKey } from './helpers/playersHelpers';
import { PlayersHeader } from './components/PlayersHeader';
import { PlayersFilters } from './components/PlayersFilters';
import { PlayersCount } from './components/PlayersCount';
import { PlayersGrid } from './components/PlayersGrid';

export default function PlayersPage() {
	const [search, setSearch] = useState('');
	const [positionFilter, setPositionFilter] = useState<Player['position'] | 'Wszyscy'>('Wszyscy');
	const [sortKey, setSortKey] = useState<SortKey>('name');
	const [captainOnly, setCaptainOnly] = useState(false);

	const filtered = sortPlayers(
		players.filter((p) => {
			const nameMatch = `${p.firstName} ${p.lastName}`
				.toLowerCase()
				.includes(search.toLowerCase());
			const posMatch  = positionFilter === 'Wszyscy' || p.position === positionFilter;
			const capMatch  = !captainOnly || p.isCaptain;
			return nameMatch && posMatch && capMatch;
		}),
		sortKey,
	);

	return (
		<div style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 16px' }}>
			<PlayersHeader />

			<PlayersFilters
				search={search}
				onSearchChange={setSearch}
				positionFilter={positionFilter}
				onPositionChange={setPositionFilter}
				captainOnly={captainOnly}
				onCaptainOnlyChange={setCaptainOnly}
				sortKey={sortKey}
				onSortChange={setSortKey}
			/>

			<PlayersCount count={filtered.length} />

			<PlayersGrid players={filtered} />
		</div>
	);
}