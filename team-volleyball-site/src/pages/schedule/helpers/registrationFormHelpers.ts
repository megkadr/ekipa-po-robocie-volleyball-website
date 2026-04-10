import type {ScheduleEvent} from "../types/scheduleTypes.ts";
import type {Player} from "../../../shared/types/player.ts";

/**
 * Przyjmuje tylko wybranych zawodników — nie całą drużynę.
 */
export function buildRegistrationFormHtml(
	_event: ScheduleEvent,
	selectedPlayers: Player[],
): string {
	const captain = selectedPlayers.find((p) => p.isCaptain)
		?? selectedPlayers[0];

	const rows = Array.from({ length: 12 }, (_, i) => {
		const player = selectedPlayers[i];
		return `<tr>
			<td>${i + 1}</td>
			<td>${player ? `${player.firstName} ${player.lastName}` : ''}</td>
			<td></td>
			<td></td>
		</tr>`;
	}).join('\n');

	return `<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8"/>
<title>Załącznik nr 1</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; font-size: 13px; color: #000; background: #fff; padding: 28px 36px; }
  h1 { font-size: 14px; font-weight: bold; text-decoration: underline; margin-bottom: 20px; }
  .row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 10px; }
  .lbl { font-weight: bold; min-width: 190px; white-space: nowrap; }
  .val { border-bottom: 1px solid #000; flex: 1; min-height: 16px; padding-bottom: 1px; }
  table { width: 100%; border-collapse: collapse; margin-top: 22px; }
  th { border: 1px solid #333; padding: 6px 8px; background: #f0f0f0; font-size: 12px; text-align: left; }
  td { border: 1px solid #333; padding: 7px 8px; font-size: 12px; vertical-align: middle; }
  td:first-child { text-align: center; width: 36px; }
  td:nth-child(3), td:nth-child(4) { width: 150px; }
  .note { margin-top: 28px; font-size: 11px; color: #555; border-top: 1px solid #ddd; padding-top: 10px; }
  .actions { margin-top: 20px; display: flex; gap: 10px; }
  .btn-print { padding: 9px 22px; background: #1a56db; color: #fff; border: none; border-radius: 7px; font-size: 13px; font-weight: bold; cursor: pointer; }
  .btn-close { padding: 9px 22px; background: #e5e7eb; color: #333; border: none; border-radius: 7px; font-size: 13px; cursor: pointer; }
  @media print {
    .actions { display: none; }
    body { padding: 10px 16px; }
  }
</style>
</head>
<body>
<h1>Załącznik nr 1</h1>

<div class="row"><span class="lbl">Nazwa zespołu:</span><span class="val">Ekipa Po Robocie</span></div>
<div class="row"><span class="lbl">Kapitan (Kierownik):</span><span class="val">${captain ? `${captain.firstName} ${captain.lastName}` : ''}</span></div>
<div class="row"><span class="lbl">Tel.:</span><span class="val"></span></div>
<div class="row"><span class="lbl">Email:</span><span class="val"></span></div>

<table>
  <thead>
    <tr>
      <th>LP</th>
      <th>Imię i Nazwisko</th>
      <th>Data Urodzenia</th>
      <th>Podpis</th>
    </tr>
  </thead>
  <tbody>
    ${rows}
  </tbody>
</table>

<div class="note">Podpisy należy złożyć odręcznie. Formularz wygenerowano automatycznie.</div>

<div class="actions">
  <button class="btn-print" onclick="window.print()">🖨 Drukuj</button>
  <button class="btn-close" onclick="window.close()">Zamknij</button>
</div>
</body>
</html>`;
}

export function openRegistrationForm(event: ScheduleEvent, selectedPlayers: Player[]): void {
	const html  = buildRegistrationFormHtml(event, selectedPlayers);
	const blob  = new Blob([html], { type: 'text/html;charset=utf-8' });
	const url   = URL.createObjectURL(blob);
	const win   = window.open(url, '_blank', 'width=860,height=680,menubar=no,toolbar=no');
	setTimeout(() => URL.revokeObjectURL(url), 60_000);

	// Fallback gdy popup zablokowany
	if (!win) {
		const a    = document.createElement('a');
		a.href     = url;
		a.download = `formularz-${event.slug}.html`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
}