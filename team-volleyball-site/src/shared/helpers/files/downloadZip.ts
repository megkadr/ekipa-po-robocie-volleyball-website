import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type {GalleryPhoto} from "../../../pages/gallery/types/galleryTypes.ts";
import {getPhotoFilename, resolvePhotoPath} from "../../../pages/gallery/helpers/galleryHelpers.ts";

export interface ZipProgress {
	downloaded: number;
	total: number;
	phase: 'downloading' | 'zipping' | 'done' | 'error';
}

/**
 * Pobiera wszystkie zdjęcia wydarzenia, pakuje do ZIP i zapisuje jako jeden plik.
 * @param photos       - lista zdjęć do spakowania
 * @param zipName      - nazwa pliku ZIP bez rozszerzenia, np. "bals-biskupiec-2024-03"
 * @param onProgress   - callback z postępem (opcjonalny)
 */
export async function downloadPhotosAsZip(
	photos: GalleryPhoto[],
	zipName: string,
	onProgress?: (progress: ZipProgress) => void,
): Promise<void> {
	const zip   = new JSZip();
	const total = photos.length;

	// Faza 1: Pobieranie zdjęć równolegle (max 4 naraz)
	const BATCH_SIZE = 4;

	for (let i = 0; i < photos.length; i += BATCH_SIZE) {
		const batch = photos.slice(i, i + BATCH_SIZE);

		await Promise.all(
			batch.map(async (photo) => {
				try {
					const response = await fetch(resolvePhotoPath(photo.path));
					if (!response.ok) throw new Error(`HTTP ${response.status}`);
					const blob     = await response.blob();
					const filename = getPhotoFilename(photo.path);
					zip.file(filename, blob);
				} catch (err) {
					console.warn(`Pominięto zdjęcie: ${photo.path}`, err);
				}
			})
		);

		onProgress?.({
			downloaded: Math.min(i + BATCH_SIZE, total),
			total,
			phase: 'downloading',
		});
	}

	// Faza 2: Generowanie ZIP
	onProgress?.({ downloaded: total, total, phase: 'zipping' });

	const content = await zip.generateAsync(
		{ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } },
		(metadata) => {
			void metadata;
		}
	);

	// Faza 3: Zapis pliku
	saveAs(content, `${zipName}.zip`);

	onProgress?.({ downloaded: total, total, phase: 'done' });
}