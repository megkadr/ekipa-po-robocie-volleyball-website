// TODO: Galeria zdjęć z meczów

export default function GalleryPage() {
	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
			<span className="text-6xl block mb-6">📷</span>
			<h1
				className="text-3xl font-extrabold mb-3"
				style={{ color: 'var(--text-primary)' }}
			>
				Galeria
			</h1>
			<p style={{ color: 'var(--text-secondary)' }}>
				{/* TODO: Dodać zdjęcia z meczów i treningów */}
				Zdjęcia z meczów i treningów pojawią się tutaj.
			</p>
		</div>
	);
}