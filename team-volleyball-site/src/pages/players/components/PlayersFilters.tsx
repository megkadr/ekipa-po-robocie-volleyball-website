import type { Player } from '../../../shared/types/player';
import { Chip } from './Chip';
import {
	allPositions,
	positionColors,
	sortLabels,
	type SortKey,
} from '../helpers/playersHelpers';

interface PlayersFiltersProps {
	search: string;
	onSearchChange: (value: string) => void;
	positionFilter: Player['position'] | 'Wszyscy';
	onPositionChange: (pos: Player['position'] | 'Wszyscy') => void;
	captainOnly: boolean;
	onCaptainOnlyChange: (value: boolean) => void;
	sortKey: SortKey;
	onSortChange: (key: SortKey) => void;
}

export function PlayersFilters({
								   search,
								   onSearchChange,
								   positionFilter,
								   onPositionChange,
								   captainOnly,
								   onCaptainOnlyChange,
								   sortKey,
								   onSortChange,
							   }: PlayersFiltersProps) {
	return (
		<div
			style={{
				borderRadius: '16px',
				border: '1px solid var(--border)',
				background: 'var(--bg-surface)',
				padding: '16px',
				marginBottom: '28px',
				display: 'flex',
				flexDirection: 'column',
				gap: '14px',
			}}
		>
			{/* Search */}
			<div style={{ position: 'relative' }}>
				<span
					style={{
						position: 'absolute',
						left: '14px',
						top: '50%',
						transform: 'translateY(-50%)',
						pointerEvents: 'none',
					}}
				>
					🔍
				</span>
				<input
					type="text"
					placeholder="Szukaj po imieniu lub nazwisku..."
					value={search}
					onChange={(e) => onSearchChange(e.target.value)}
					style={{
						all: 'unset',
						display: 'block',
						width: '100%',
						boxSizing: 'border-box' as const,
						paddingLeft: '42px',
						paddingRight: '40px',
						paddingTop: '10px',
						paddingBottom: '10px',
						borderRadius: '10px',
						background: 'var(--bg-elevated)',
						border: '1px solid var(--border)',
						color: 'var(--text-primary)',
						fontSize: '14px',
					}}
				/>
				{search && (
					<button
						onClick={() => onSearchChange('')}
						style={{
							all: 'unset',
							cursor: 'pointer',
							position: 'absolute',
							right: '12px',
							top: '50%',
							transform: 'translateY(-50%)',
							color: 'var(--text-muted)',
							fontSize: '16px',
							lineHeight: 1,
						}}
						aria-label="Wyczyść wyszukiwanie"
					>
						✕
					</button>
				)}
			</div>

			{/* Position chips */}
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
				<Chip
					label="Wszyscy"
					active={positionFilter === 'Wszyscy'}
					onClick={() => onPositionChange('Wszyscy')}
				/>
				{allPositions.map((pos) => (
					<Chip
						key={pos}
						label={pos}
						active={positionFilter === pos}
						color={positionColors[pos]}
						onClick={() => onPositionChange(positionFilter === pos ? 'Wszyscy' : pos)}
					/>
				))}
				<Chip
					label="👑 Kapitan"
					active={captainOnly}
					color="#f59e0b"
					onClick={() => onCaptainOnlyChange(!captainOnly)}
				/>
			</div>

			{/* Sort chips */}
			<div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
				<span
					style={{
						fontSize: '11px',
						textTransform: 'uppercase',
						letterSpacing: '0.08em',
						color: 'var(--text-muted)',
						fontWeight: 600,
						flexShrink: 0,
					}}
				>
					Sortuj:
				</span>
				{(Object.keys(sortLabels) as SortKey[]).map((key) => (
					<Chip
						key={key}
						label={sortLabels[key]}
						active={sortKey === key}
						onClick={() => onSortChange(key)}
					/>
				))}
			</div>
		</div>
	);
}