import { useState } from 'react';
import type { ScheduleEvent } from '../types/scheduleTypes';
import { players as allPlayers } from '../../../shared/data/players';
import { openRegistrationForm } from '../helpers/registrationFormHelpers';

interface RegistrationFormButtonProps {
	event: ScheduleEvent;
}

export function RegistrationFormButton({ event }: RegistrationFormButtonProps) {
	const [selectorOpen, setSelectorOpen] = useState(false);

	const [selectedIds, setSelectedIds]   = useState<Set<string>>(
		new Set(allPlayers.map((p) => p.id))
	);
	const [generated, setGenerated]       = useState(false);

	const togglePlayer = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) { next.delete(id); } else { next.add(id); }
			return next;
		});
	};

	const toggleAll = () => {
		if (selectedIds.size === allPlayers.length) {
			setSelectedIds(new Set());
		} else {
			setSelectedIds(new Set(allPlayers.map((p) => p.id)));
		}
	};

	const handleGenerate = () => {
		const selected = allPlayers.filter((p) => selectedIds.has(p.id));
		if (selected.length === 0) return;
		openRegistrationForm(event, selected);
		setGenerated(true);
		setTimeout(() => setGenerated(false), 2500);
	};

	const selectedCount = selectedIds.size;
	const allChecked    = selectedCount === allPlayers.length;

	return (
		<div
			style={{
				borderRadius: '12px',
				background: 'rgba(79,142,247,0.06)',
				border: '1px solid rgba(79,142,247,0.25)',
				overflow: 'hidden',
			}}
		>
			{/* Header row */}
			<div
				style={{
					padding: '14px 16px',
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '12px',
				}}
			>
				<div>
					<p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
						📋 Formularz zgłoszeniowy (Załącznik nr 1)
					</p>
					<p style={{ margin: '3px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
						Wybierz zawodników biorących udział, a następnie wygeneruj formularz do druku.
					</p>
				</div>

				<button
					onClick={() => setSelectorOpen((v) => !v)}
					style={{
						all: 'unset',
						cursor: 'pointer',
						padding: '7px 14px',
						borderRadius: '8px',
						fontSize: '12px',
						fontWeight: 600,
						background: selectorOpen ? 'var(--accent-dim)' : 'var(--bg-elevated)',
						color: selectorOpen ? 'var(--accent)' : 'var(--text-secondary)',
						border: `1px solid ${selectorOpen ? 'var(--accent)' : 'var(--border)'}`,
						transition: 'all 0.15s',
						flexShrink: 0,
					}}
				>
					{selectorOpen ? '▲ Zwiń' : '▼ Wybierz zawodników'}
				</button>
			</div>

			{/* Player selector */}
			{selectorOpen && (
				<div
					style={{
						borderTop: '1px solid rgba(79,142,247,0.2)',
						padding: '14px 16px',
					}}
				>
					{/* Select all row */}
					<label
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
							padding: '8px 10px',
							borderRadius: '8px',
							background: 'var(--bg-elevated)',
							marginBottom: '8px',
							cursor: 'pointer',
							border: '1px solid var(--border)',
						}}
					>
						<input
							type="checkbox"
							checked={allChecked}
							onChange={toggleAll}
							style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--accent)' }}
						/>
						<span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
							{allChecked ? 'Odznacz wszystkich' : 'Zaznacz wszystkich'}
						</span>
						<span
							style={{
								marginLeft: 'auto',
								fontSize: '11px',
								color: 'var(--accent)',
								fontWeight: 600,
							}}
						>
							{selectedCount} / {allPlayers.length}
						</span>
					</label>

					{/* Player checkboxes */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
							gap: '6px',
							marginBottom: '14px',
						}}
					>
						{allPlayers.map((player) => {
							const checked = selectedIds.has(player.id);
							return (
								<label
									key={player.id}
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '8px',
										padding: '7px 10px',
										borderRadius: '8px',
										border: `1px solid ${checked ? 'rgba(79,142,247,0.4)' : 'var(--border)'}`,
										background: checked ? 'rgba(79,142,247,0.08)' : 'var(--bg-elevated)',
										cursor: 'pointer',
										transition: 'all 0.12s',
									}}
								>
									<input
										type="checkbox"
										checked={checked}
										onChange={() => togglePlayer(player.id)}
										style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: 'var(--accent)', flexShrink: 0 }}
									/>
									<span style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.2 }}>
										{player.firstName} {player.lastName}
										{player.isCaptain && (
											<span style={{ marginLeft: '5px', fontSize: '9px', background: '#f59e0b', color: '#000', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
												K
											</span>
										)}
									</span>
								</label>
							);
						})}
					</div>

					{/* Generate button */}
					<button
						onClick={handleGenerate}
						disabled={selectedCount === 0}
						style={{
							all: 'unset',
							cursor: selectedCount === 0 ? 'default' : 'pointer',
							display: 'inline-flex',
							alignItems: 'center',
							gap: '7px',
							padding: '9px 20px',
							borderRadius: '9px',
							fontSize: '13px',
							fontWeight: 600,
							background: generated
								? 'rgba(79,247,160,0.15)'
								: selectedCount === 0
									? 'var(--bg-muted)'
									: 'var(--accent)',
							color: generated
								? '#4ff7a0'
								: selectedCount === 0
									? 'var(--text-muted)'
									: '#fff',
							border: generated ? '1px solid #4ff7a040' : 'none',
							opacity: selectedCount === 0 ? 0.5 : 1,
							transition: 'all 0.2s',
						}}
					>
						{generated
							? '✓ Otwarto w nowym oknie'
							: `🖨 Generuj formularz (${selectedCount} zawodników)`}
					</button>
				</div>
			)}
		</div>
	);
}