# 🏐 Ekipa Po Robocie — Strona drużyny siatkówki

> Wizytówka amatorskiej drużyny siatkówki zbudowana jako projekt frontendowy — demonstracja praktycznych umiejętności React + TypeScript w realnym scenariuszu produkcyjnym.

**🔗 Live:** [megkadr.github.io/ekipa-po-robocie-volleyball-website](https://megkadr.github.io/ekipa-po-robocie-volleyball-website/)

---

## 📊 Wyniki Lighthouse (Unlighthouse)

| Kategoria | Wynik |
|---|---|
| ⚡ Performance | **100** |
| ♿ Accessibility | **96** |
| ✅ Best Practices | **100** |
| 🔍 SEO | **100** |
| **Total** | **99 / 100** |

<img width="895" height="287" alt="Zrzut ekranu_20260406_011619" src="https://github.com/user-attachments/assets/44cf5f38-a858-4f58-9d9d-7a20fce43515" />

---

## 📸 Podgląd

<img width="2558" height="1350" alt="Zrzut ekranu_20260411_231254" src="https://github.com/user-attachments/assets/e62b9101-8080-42b8-8496-9f2be5ad0a4e" />

<img width="2558" height="1350" alt="Zrzut ekranu_20260411_231304" src="https://github.com/user-attachments/assets/0364c745-e589-4693-8bac-a4b3011e291b" />

<img width="2558" height="1350" alt="Zrzut ekranu_20260411_231307" src="https://github.com/user-attachments/assets/b837a20d-57eb-4fed-85a0-bcf5bce001dd" />

<img width="2558" height="1350" alt="Zrzut ekranu_20260411_231310" src="https://github.com/user-attachments/assets/e505c4b5-b099-4418-99b5-5c8064c446e7" />

<img width="2558" height="1350" alt="Zrzut ekranu_20260411_231313" src="https://github.com/user-attachments/assets/20339a98-4a68-46c5-8928-82f04b8509b9" />

---

## 🧩 Funkcjonalności

### Strony
- **Strona główna** — hero section z placeholderem zdjęcia drużynowego, nieskończona karuzela zawodników z animacją flip-card on hover, sekcja podglądu osiągnięć
- **Zawodnicy** — karty w stylu kart piłkarskich FIFA, filtrowanie po pozycji i stanie (kapitan), wyszukiwanie po nazwisku, sortowanie po 6 parametrach
- **Profil zawodnika** — pełny widok z bio, statystykami, hobby, stażem w drużynie
- **Terminarz** — lista wydarzeń z automatycznym podziałem na nadchodzące / w toku / zakończone, szczegóły turnieju z wynikami meczów i ligii
- **Galeria** — timeline grupowany po roku i miesiącu, podgląd zdjęć w siatce, fullscreen lightbox z nawigacją klawiaturą, pobieranie zdjęć w ZIP
- **Osiągnięcia** — timeline sukcesów drużyny (podium, MVP, wyróżnienia)
- **Kontakt** — dane kapitana z linkami `tel:` i `mailto:`
- **404** — animowana strona błędu

### Dokumenty turniejowe
- Podgląd regulaminu turnieju jako PDF w modalnym oknie (bez pobierania)
- Pobieranie PDF
- Generator formularza zgłoszeniowego — automatycznie wypełnia dane drużyny i zawodników, selektor uczestników turnieju, wynik gotowy do druku

### Galeria
- Pobieranie wszystkich zdjęć wydarzenia jako paczka ZIP (`JSZip` + `file-saver`)
- Pobieranie pojedynczego zdjęcia
- Lightbox: nawigacja strzałkami klawiatury (← →), zamknięcie przez Escape, blokada scrolla body

---

## 🛠 Stack technologiczny

### Core
| Technologia | Wersja | Rola |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.9 | Typowanie statyczne |
| Vite | 8 | Bundler + dev server |
| React Compiler | 1.0 | Automatyczna optymalizacja renderowania (eliminuje `useMemo`/`useCallback`) |

### Routing i nawigacja
| Technologia | Uwagi |
|---|---|
| React Router v7 | `HashRouter` — wymagany przez GitHub Pages |
| Polskie ścieżki URL | `/zawodnicy`, `/zawodnik/:slug`, `/terminarz`, `/galeria`, `/osiagniecia` |
| SEO-friendly slugi | Format `jan-kowalski-1` — normalizacja polskich znaków |

### Stylowanie
| Technologia | Uwagi |
|---|---|
| Tailwind CSS v4 | Utility-first styling |
| CSS custom properties | Spójna paleta ciemnego motywu (`--bg-base`, `--accent` itd.) |
| CSS `@keyframes` | Animacje wejścia stron, bounce 404, flip kart |

### Biblioteki
| Biblioteka | Zastosowanie |
|---|---|
| `JSZip` + `file-saver` | Pobieranie zdjęć jako ZIP |
| `clsx` + `tailwind-merge` | Warunkowe klasy CSS |
| `bun` | Package manager (zamiast npm/yarn) |

---

## 🏗 Architektura projektu

```
src/
├── pages/
│   ├── home/                    # Strona główna + komponenty
│   │   └── components/
│   │       ├── HeroSection.tsx
│   │       ├── PlayersCarousel.tsx
│   │       ├── PlayerCard.tsx   # Flip-card z animacją CSS 3D
│   │       └── AchievementsPreview.tsx
│   ├── players/                 # Lista zawodników
│   │   ├── helpers/             # Sortowanie, filtrowanie, kolory pozycji
│   │   └── components/          # FifaCard, Chip, PlayersFilters, PlayersGrid
│   ├── player/                  # Profil zawodnika (routing po slug)
│   ├── schedule/                # Terminarz
│   │   ├── types/               # ScheduleEvent, TournamentResult, LeagueResult
│   │   ├── data/                # Dane wydarzeń (ręcznie uzupełniane)
│   │   ├── helpers/             # getEventStatus, grupowanie, formatowanie
│   │   └── components/          # PdfViewer, PdfViewerModal, RegistrationFormButton
│   ├── gallery/                 # Galeria z timeline
│   │   ├── event/               # Widok pojedynczego wydarzenia
│   │   │   └── components/      # PhotoGrid, PhotoLightbox, DownloadAllButton
│   │   └── components/          # GalleryTimeline, EventPreviewCard
│   ├── achievements/            # Osiągnięcia drużyny
│   └── not-found/               # Strona 404
├── shared/
│   ├── components/
│   │   ├── layout/              # Header, Footer, Layout, PageTransition
│   │   └── ui/                  # LazyImage, InfiniteMovingCards
│   ├── data/                    # players.ts — statyczne dane zawodników
│   ├── helpers/                 # getCorrectPath, downloadZip, pdfHelpers
│   ├── lib/                     # cn() — utility dla Tailwind
│   ├── router/                  # AppRouter z HashRouter
│   └── types/                   # Player, GalleryEvent i inne typy
```

### Zasady struktury
- Każda strona ma własny folder z podfolderami `components/`, `helpers/`, `data/`, `types/`
- Helpery, typy i dane wydzielone do osobnych plików — bez monolitycznych komponentów
- Dane statyczne w plikach `.ts` — łatwe do ręcznego uzupełniania przez właściciela strony

---

## ⚙️ Wybory techniczne — uzasadnienie

**React Compiler** zamiast ręcznych optymalizacji — projekt używa wariantu `TypeScript + React Compiler` z Vite, który automatycznie eliminuje zbędne re-rendery. Nie ma `useMemo`, `useCallback` — kompilator generuje je sam w build time.

**HashRouter zamiast BrowserRouter** — GitHub Pages nie obsługuje server-side routing. `HashRouter` pozwala na bezpośredni dostęp do podstron bez konfiguracji serwera.

**Brak backendu i API** — strona jest w pełni statyczna. Dane zawodników, wydarzeń, galerii i osiągnięć trzymane są w plikach TypeScript. Właściciel strony uzupełnia je ręcznie — zero infrastruktury, zero kosztów.

**Zdjęcia w formacie WebP** — wszystkie zdjęcia profilowe i galeryjne w formacie `.webp` dla minimalnego rozmiaru przy wysokiej jakości. `LazyImage` z `IntersectionObserver` ładuje je dopiero gdy zbliżają się do viewportu.

**SEO bez frameworka** — polskie ścieżki URL, dynamiczny `document.title` i `meta[description]` na stronach zawodników i wydarzeń, `sitemap.xml` + `robots.txt`, Open Graph dla podglądu w social media.

---

## 🚀 Uruchomienie lokalne

```bash
# Wymagania: Node.js ≥ 22 / bun ≥ 1.3

git clone https://github.com/megkadr/ekipa-po-robocie-volleyball-website.git
cd ekipa-po-robocie-volleyball-website

bun install
bun run dev
```

Aplikacja dostępna pod `http://localhost:5173/`

---

## 📦 Build i deploy

```bash
# Build produkcyjny
bun run build

# Podgląd builda
bun run preview
```

Deploy na GitHub Pages wykonywany ręcznie przez `gh-pages` branch lub bezpośrednio przez GitHub Pages z brancha `main`/`dist`.

---

## 📁 Dodawanie treści

Projekt nie ma CMS-a — treść uzupełniana bezpośrednio w plikach TypeScript:

| Co dodać | Plik |
|---|---|
| Nowy zawodnik | `src/shared/data/players.ts` |
| Nowe wydarzenie (turniej/liga) | `src/pages/schedule/data/scheduleEvents.ts` |
| Zdjęcia galerii | `public/assets/images/gallery/{slug}/` + wpis w `src/pages/gallery/data/events.ts` |
| Osiągnięcie | `src/pages/achievements/data/achievements.ts` |
| Dokument PDF do turnieju | `public/assets/docs/{slug}/` + pole `documents[]` w `scheduleEvents.ts` |

---

## 👤 Autor

**megkadr** — frontend developer od 2022 roku, specjalizacja React + TypeScript.

---

*Projekt open source*
