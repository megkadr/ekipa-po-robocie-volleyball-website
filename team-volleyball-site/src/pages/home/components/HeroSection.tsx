export function HeroSection() {
	return (
		<section
			className="relative w-full overflow-hidden"
			style={{
				background: 'var(--gradient-hero)',
				borderBottom: '1px solid var(--border)',
			}}
		>
			{/* Decorative background grid */}
			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: `
            linear-gradient(var(--accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent) 1px, transparent 1px)
          `,
					backgroundSize: '60px 60px',
				}}
				aria-hidden="true"
			/>

			{/* Glow blob */}
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full blur-3xl opacity-10 pointer-events-none"
				style={{ background: 'var(--accent)' }}
				aria-hidden="true"
			/>

			<div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
				<div className="flex flex-col items-center text-center gap-6">
					{/* Badge */}
					<span
						className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest border"
						style={{
							background: 'var(--accent-dim)',
							borderColor: 'var(--accent)',
							color: 'var(--accent)',
						}}
					>
            🏐 Amatorska liga siatkówki
          </span>

					{/* Title */}
					<h1
						className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
						style={{ color: 'var(--text-primary)' }}
					>
						Ekipa{' '}
						<span
							className="relative inline-block"
							style={{ color: 'var(--accent)' }}
						>
              Po Robocie
            </span>
					</h1>

					{/* Subtitle */}
					<p
						className="max-w-xl text-lg leading-relaxed"
						style={{ color: 'var(--text-secondary)' }}
					>
						Przychodzimy po ciężkim dniu pracy — i gramy tak, jakby to był
						nasz ostatni mecz. Pasja, pot i siatka.
					</p>

					{/* Team photo placeholder */}
					<div
						className="mt-6 w-full max-w-3xl rounded-2xl overflow-hidden border flex items-center justify-center"
						style={{
							background: 'var(--bg-elevated)',
							borderColor: 'var(--border)',
							aspectRatio: '16 / 7',
						}}
					>
						{/* TODO: Podmienić na realne zdjęcie drużyny */}
						<div className="flex flex-col items-center gap-3 p-8">
							<span className="text-6xl" aria-hidden="true">📸</span>
							<p
								className="text-sm font-medium"
								style={{ color: 'var(--text-muted)' }}
							>
								{/* TODO: Zdjęcie drużyny */}
								Tutaj pojawi się zdjęcie drużyny
							</p>
						</div>
					</div>

					{/* Stats strip */}
					<div className="mt-8 flex flex-wrap justify-center gap-8">
						{[
							{ label: 'Zawodników', value: '10' },
							{ label: 'Sezony', value: '1' },
							{ label: 'Mecze', value: '5' },
						].map((stat) => (
							<div key={stat.label} className="flex flex-col items-center">
                <span
					className="text-3xl font-black"
					style={{ color: 'var(--accent)' }}
				>
                  {stat.value}
                </span>
								<span
									className="text-xs uppercase tracking-wider mt-1"
									style={{ color: 'var(--text-muted)' }}
								>
                  {stat.label}
                </span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}