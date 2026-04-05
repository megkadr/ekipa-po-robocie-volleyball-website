import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '../../lib/cn';

const navLinks = [
	{ path: '/',           label: 'Strona główna' },
	{ path: '/zawodnicy',  label: 'Zawodnicy' },
	{ path: '/terminarz',  label: 'Terminarz' },
	{ path: '/galeria',    label: 'Galeria' },
	{ path: '/kontakt',    label: 'Kontakt' },
];

export function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header
			className="sticky top-0 z-50 w-full border-b"
			style={{
				background: 'rgba(15, 17, 23, 0.88)',
				backdropFilter: 'blur(12px)',
				borderColor: 'var(--border)',
			}}
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
				{/* Logo */}
				<Link
					to="/"
					style={{
						textDecoration: 'none',
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						cursor: 'pointer',
					}}
				>
					<span style={{ fontSize: '22px' }} aria-hidden="true">🏐</span>
					<span
						style={{
							fontWeight: 700,
							fontSize: '16px',
							color: 'var(--text-primary)',
							letterSpacing: '-0.02em',
						}}
					>
            Ekipa <span style={{ color: 'var(--accent)' }}>Po Robocie</span>
          </span>
				</Link>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-1">
					{navLinks.map((link) => (
						<NavLink
							key={link.path}
							to={link.path}
							end={link.path === '/'}
							style={{ cursor: 'pointer' }}
							className={({ isActive }) =>
								cn(
									'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
									isActive
										? 'text-(--accent) bg-(--accent-dim)'
										: 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)'
								)
							}
						>
							{link.label}
						</NavLink>
					))}
				</nav>

				{/* Hamburger */}
				<button
					className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
					style={{ cursor: 'pointer', background: 'none', border: 'none' }}
					onClick={() => setMenuOpen((v) => !v)}
					aria-label="Otwórz menu nawigacyjne"
					aria-expanded={menuOpen}
				>
					{[0, 1, 2].map((i) => (
						<span
							key={i}
							className={cn(
								'block w-5 h-0.5 transition-all duration-300',
								i === 0 && menuOpen ? 'rotate-45 translate-y-2' : '',
								i === 1 && menuOpen ? 'opacity-0' : '',
								i === 2 && menuOpen ? '-rotate-45 -translate-y-2' : ''
							)}
							style={{ background: 'var(--text-primary)' }}
						/>
					))}
				</button>
			</div>

			{/* Mobile menu */}
			<div
				className={cn(
					'md:hidden overflow-hidden transition-all duration-300',
					menuOpen ? 'max-h-80' : 'max-h-0'
				)}
				style={{ borderTop: menuOpen ? '1px solid var(--border)' : 'none' }}
			>
				<nav
					className="flex flex-col px-4 py-3 gap-1"
					style={{ background: 'var(--bg-surface)' }}
				>
					{navLinks.map((link) => (
						<NavLink
							key={link.path}
							to={link.path}
							end={link.path === '/'}
							onClick={() => setMenuOpen(false)}
							style={{ cursor: 'pointer' }}
							className={({ isActive }) =>
								cn(
									'px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
									isActive
										? 'text-(--accent) bg-(--accent-dim)'
										: 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)'
								)
							}
						>
							{link.label}
						</NavLink>
					))}
				</nav>
			</div>
		</header>
	);
}