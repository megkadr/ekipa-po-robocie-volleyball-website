import { HashRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from '../components/layout/Layout';

const HomePage     = lazy(() => import('../../pages/home/Home.page'));
const PlayersPage  = lazy(() => import('../../pages/players/Players.page'));
const PlayerPage   = lazy(() => import('../../pages/player/Player.page'));
const SchedulePage = lazy(() => import('../../pages/schedule/Schedule.page'));
const GalleryPage  = lazy(() => import('../../pages/gallery/Gallery.page'));
const ContactPage  = lazy(() => import('../../pages/contact/Contact.page'));

function PageLoader() {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '400px',
				fontSize: '40px',
			}}
		>
      <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>
        🏐
      </span>
			<style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
		</div>
	);
}

export function AppRouter() {
	return (
		<HashRouter>
			<Suspense fallback={<PageLoader />}>
				<Routes>
					<Route element={<Layout />}>
						<Route index              element={<HomePage />} />
						<Route path="zawodnicy"   element={<PlayersPage />} />
						<Route path="zawodnik/:slug" element={<PlayerPage />} />
						<Route path="terminarz"   element={<SchedulePage />} />
						<Route path="galeria"     element={<GalleryPage />} />
						<Route path="kontakt"     element={<ContactPage />} />
						{/* Fallback */}
						<Route path="*"           element={<HomePage />} />
					</Route>
				</Routes>
			</Suspense>
		</HashRouter>
	);
}