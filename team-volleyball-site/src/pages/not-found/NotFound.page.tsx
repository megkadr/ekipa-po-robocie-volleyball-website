import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '70svh',
				padding: '48px 24px',
				textAlign: 'center',
				gap: '0',
			}}
		>
			{/* Animated volleyball */}
			<div
				style={{
					fontSize: '80px',
					lineHeight: 1,
					marginBottom: '24px',
					animation: 'bounce404 1.4s ease-in-out infinite',
				}}
			>
				🏐
			</div>

			{/* 404 number */}
			<p
				style={{
					margin: '0 0 4px',
					fontSize: 'clamp(72px, 15vw, 120px)',
					fontWeight: 900,
					lineHeight: 1,
					color: 'transparent',
					background: 'linear-gradient(135deg, var(--accent), var(--accent-hover, #6ba3ff))',
					WebkitBackgroundClip: 'text',
					backgroundClip: 'text',
					letterSpacing: '-4px',
				}}
			>
				404
			</p>

			<h1
				style={{
					margin: '0 0 12px',
					fontSize: 'clamp(20px, 4vw, 28px)',
					fontWeight: 800,
					color: 'var(--text-primary)',
				}}
			>
				Strona nie istnieje
			</h1>

			<p
				style={{
					margin: '0 0 32px',
					fontSize: '15px',
					color: 'var(--text-secondary)',
					maxWidth: '380px',
					lineHeight: 1.6,
				}}
			>
				Wygląda na to, że ta piłka wylądowała poza boiskiem.
				Strona, której szukasz, nie została znaleziona.
			</p>

			{/* Actions */}
			<div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
				<button
					onClick={() => navigate(-1)}
					style={{
						all: 'unset',
						cursor: 'pointer',
						padding: '10px 22px',
						borderRadius: '10px',
						fontSize: '14px',
						fontWeight: 600,
						border: '1px solid var(--border)',
						color: 'var(--text-secondary)',
						background: 'var(--bg-elevated)',
						transition: 'border-color 0.15s, color 0.15s',
					}}
					onMouseEnter={(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.borderColor = 'var(--accent)';
						el.style.color = 'var(--text-primary)';
					}}
					onMouseLeave={(e) => {
						const el = e.currentTarget as HTMLElement;
						el.style.borderColor = 'var(--border)';
						el.style.color = 'var(--text-secondary)';
					}}
				>
					← Wróć
				</button>

				<button
					onClick={() => navigate('/')}
					style={{
						all: 'unset',
						cursor: 'pointer',
						padding: '10px 22px',
						borderRadius: '10px',
						fontSize: '14px',
						fontWeight: 600,
						background: 'var(--accent)',
						color: '#fff',
						transition: 'opacity 0.15s',
					}}
					onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.88')}
					onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
				>
					Strona główna
				</button>
			</div>

			<style>{`
				@keyframes bounce404 {
					0%, 100% { transform: translateY(0) rotate(0deg); }
					30%       { transform: translateY(-22px) rotate(-8deg); }
					60%       { transform: translateY(-10px) rotate(5deg); }
				}
			`}</style>
		</div>
	);
}