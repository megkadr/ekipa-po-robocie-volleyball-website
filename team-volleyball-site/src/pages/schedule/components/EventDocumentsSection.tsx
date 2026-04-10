import type { ScheduleEvent } from '../types/scheduleTypes';
import { PdfViewer } from './PdfViewer';
import { RegistrationFormButton } from './RegistrationFormButton';

interface EventDocumentsSectionProps {
	event: ScheduleEvent;
}

export function EventDocumentsSection({ event }: EventDocumentsSectionProps) {
	const docs = event.documents ?? [];
	if (docs.length === 0) return null;

	const hasAnyRegistrationForm = docs.some((d) => d.hasRegistrationForm);

	return (
		<section>
			{/* H2 — sekcja wewnątrz artykułu */}
			<h2
				style={{
					fontSize: '11px',
					fontWeight: 700,
					textTransform: 'uppercase',
					letterSpacing: '0.1em',
					color: 'var(--accent)',
					margin: '0 0 14px',
				}}
			>
				Dokumenty
			</h2>

			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				{/* PDF viewers */}
				{docs.map((doc) => (
					<PdfViewer
						key={doc.path}
						path={doc.path}
						label={doc.label}
					/>
				))}

				{/* Formularz zgłoszeniowy — tylko gdy dokument ma hasRegistrationForm */}
				{hasAnyRegistrationForm && (
					<RegistrationFormButton event={event} />
				)}
			</div>
		</section>
	);
}