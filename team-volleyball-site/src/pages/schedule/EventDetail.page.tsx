import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { scheduleEvents } from './data/scheduleEvents';
import { TypeBadge, StatusBadge } from './components/ScheduleBadges';
import { TournamentResultSection } from './components/TournamentResultSection';
import { LeagueResultSection } from './components/LeagueResultSection';
import {
	getEventStatus,
	formatDateRange,
} from './helpers/scheduleHelpers';
import type { TournamentResult, LeagueResult } from './types/scheduleTypes';

function isTournamentResult(result: TournamentResult | LeagueResult): result is TournamentResult {
	return 'matches' in result;
}

export default function EventDetailPage() {
	const { slug }  = useParams<{ slug: string }>();
	const navigate  = useNavigate();

	const event  = scheduleEvents.find((e) => e.slug === slug);
	const status = event ? getEventStatus(event) : null;

	useEffect(() => {
		if (event) {
			document.title = `${event.name} — Terminarz | Ekipa Po Robocie`;
		}
		return () => { document.title = 'Ekipa Po Robocie — Amatorska drużyna siatkówki'; };
	}, [event]);

	if (!event) {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '16px', padding: '32px', textAlign: 'center' }}>
				<span style={{ fontSize: '56px' }}>📅</span>
				<h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
					Wydarzenie nie zostało znalezione
				</h1>
				<button onClick={() => navigate('/terminarz')} style={{ all: 'unset', cursor: 'pointer', padding: '10px 24px', borderRadius: '99px', background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '14px' }}>
					Wróć do terminarza
				</button>
			</div>
		);
	}

	return (
		<div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 16px' }}>
			{/* Back */}
			<button
				onClick={() => navigate('/terminarz')}
				style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '28px', fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.15s' }}
				onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-primary)')}
				onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
			>
				← Terminarz
			</button>

			<article
				style={{
					borderRadius: '20px',
					border: '1px solid var(--border)',
					background: 'var(--bg-surface)',
					overflow: 'hidden',
				}}
			>
				{/* Header */}
				<div
					style={{
						padding: '24px 28px',
						borderBottom: '1px solid var(--border)',
						background: 'var(--bg-elevated)',
					}}
				>
					<div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
						<TypeBadge type={event.type} />
						{status && <StatusBadge status={status} />}
					</div>

					{/* H1 */}
					<h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 10px', lineHeight: 1.3 }}>
						{event.name}
					</h1>

					<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
						<span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
							📍 {event.location}
						</span>
						<span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
							📅 {formatDateRange(event.startDate, event.endDate)}
						</span>
					</div>
				</div>

				<div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
					{/* Description */}
					<section>
						<h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', margin: '0 0 10px' }}>
							Opis
						</h2>
						<p style={{ margin: 0, fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
							{event.description}
						</p>
					</section>

					{/* Results */}
					{event.result && (
						<section>
							<h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', margin: '0 0 16px' }}>
								Wyniki
							</h2>

							{isTournamentResult(event.result) ? (
								<TournamentResultSection result={event.result} />
							) : (
								<LeagueResultSection result={event.result as LeagueResult} />
							)}
						</section>
					)}

					{/* No result yet */}
					{!event.result && status !== 'finished' && (
						<div
							style={{
								padding: '16px',
								borderRadius: '10px',
								background: 'var(--bg-elevated)',
								border: '1px solid var(--border)',
								textAlign: 'center',
								color: 'var(--text-muted)',
								fontSize: '14px',
							}}
						>
							{status === 'ongoing'
								? '🏐 Wydarzenie w toku — wyniki pojawią się po zakończeniu.'
								: '📅 Wydarzenie jeszcze się nie odbyło.'}
						</div>
					)}

					{/* Gallery link */}
					{event.gallerySlug && (
						<section>
							<h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', margin: '0 0 10px' }}>
								Galeria
							</h2>
							<button
								onClick={() => navigate(`/galeria/${event.gallerySlug}`)}
								style={{
									all: 'unset',
									cursor: 'pointer',
									display: 'inline-flex',
									alignItems: 'center',
									gap: '8px',
									padding: '10px 18px',
									borderRadius: '10px',
									fontSize: '13px',
									fontWeight: 600,
									background: 'var(--bg-elevated)',
									border: '1px solid var(--border)',
									color: 'var(--text-primary)',
									transition: 'border-color 0.15s',
								}}
								onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)')}
								onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
							>
								📷 Zobacz zdjęcia z tego wydarzenia →
							</button>
						</section>
					)}
				</div>
			</article>
		</div>
	);
}