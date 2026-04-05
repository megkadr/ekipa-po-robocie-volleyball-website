export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer
			className="mt-auto border-t"
			style={{
				background: 'var(--bg-surface)',
				borderColor: 'var(--border)',
			}}
		>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
				<div className="flex flex-col md:flex-row items-center justify-between gap-4">
					{/* Brand */}
					<div className="flex items-center gap-2">
						<span className="text-xl" aria-hidden="true">🏐</span>
						<span
							className="font-semibold"
							style={{ color: 'var(--text-primary)' }}
						>
              Ekipa Po Robocie
            </span>
					</div>

					{/* Tagline */}
					<p
						className="text-sm text-center"
						style={{ color: 'var(--text-muted)' }}
					>
						Amatorska drużyna siatkówki — gramy dla rywalizacji, walczymy do ostatniej piłki
					</p>

					{/* Copyright */}
					<p
						className="text-xs"
						style={{ color: 'var(--text-muted)' }}
					>
						© {year} Ekipa Po Robocie
					</p>
				</div>
			</div>
		</footer>
	);
}