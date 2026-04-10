/**
 * Zwraca absolutny URL do pliku PDF.
 *
 * HashRouter używa # dla routingu aplikacji, więc pliki statyczne
 * muszą być adresowane pełnym URL bez fragmentu (#).
 *
 * Przykład lokalnie:  http://localhost:5173/assets/docs/event/regulamin.pdf
 * Przykład gh-pages:  https://megkadr.github.io/ekipa-po-robocie-volleyball-website/assets/docs/event/regulamin.pdf
 *
 * @param path - ścieżka względem /public, np. "assets/docs/event/regulamin.pdf"
 */
export function resolvePdfPath(path: string): string {
	const base = import.meta.env.BASE_URL.endsWith('/')
		? import.meta.env.BASE_URL
		: `${import.meta.env.BASE_URL}/`;

	const cleanPath = path.startsWith('/') ? path.substring(1) : path;

	// Pełny absolutny URL — iframe go nie myli z routem HashRouter
	return `${window.location.origin}${base}${cleanPath}`;
}

export async function downloadPdf(resolvedUrl: string, filename: string): Promise<void> {
	try {
		const response = await fetch(resolvedUrl);

		if (!response.ok) {
			window.open(resolvedUrl, '_blank');
			return;
		}

		const blob = await response.blob();
		const url  = URL.createObjectURL(blob);
		const a    = document.createElement('a');
		a.href     = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	} catch (err) {
		// Błąd sieciowy (np. brak internetu) — fallback
		window.open(resolvedUrl, '_blank');
		console.warn('PDF download fallback:', err);
	}
}

/**
 * Wyciąga nazwę pliku ze ścieżki.
 * "assets/docs/event/regulamin.pdf" → "regulamin.pdf"
 */
export function getPdfFilename(path: string): string {
	return path.split('/').pop() ?? 'dokument.pdf';
}