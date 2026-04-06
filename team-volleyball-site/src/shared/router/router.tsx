import { HashRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from '../components/layout/Layout';

const HomePage          = lazy(() => import('../../pages/home/Home.page'));
const PlayersPage       = lazy(() => import('../../pages/players/Players.page'));
const PlayerPage        = lazy(() => import('../../pages/player/Player.page'));
const SchedulePage      = lazy(() => import('../../pages/schedule/Schedule.page'));
const EventDetailPage   = lazy(() => import('../../pages/schedule/EventDetail.page'));
const GalleryPage       = lazy(() => import('../../pages/gallery/Gallery.page'));
const EventGalleryPage  = lazy(() => import('../../pages/gallery/event/EventGallery.page'));
const AchievementsPage  = lazy(() => import('../../pages/achievements/Achievements.page'));
const ContactPage       = lazy(() => import('../../pages/contact/Contact.page'));
const NotFoundPage      = lazy(() => import('../../pages/not-found/NotFound.page'));

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

function withSuspense(Component: React.ComponentType) {
	return (
		<Suspense fallback={<PageLoader />}>
			<Component />
		</Suspense>
	);
}

export function AppRouter() {
	return (
		<HashRouter>
			<Suspense fallback={<PageLoader />}>
				<Routes>
					<Route element={<Layout />}>
						<Route index                       element={<HomePage />} />
						<Route path="zawodnicy"            element={withSuspense(PlayersPage)} />
						<Route path="zawodnik/:slug"       element={withSuspense(PlayerPage)} />
						<Route path="terminarz"            element={withSuspense(SchedulePage)} />
						<Route path="terminarz/:slug"      element={withSuspense(EventDetailPage)} />
						<Route path="galeria"              element={withSuspense(GalleryPage)} />
						<Route path="galeria/:slug"        element={withSuspense(EventGalleryPage)} />
						<Route path="osiagniecia"          element={withSuspense(AchievementsPage)} />
						<Route path="kontakt"              element={withSuspense(ContactPage)} />
						{/* 404 */}
						<Route path="*"                    element={withSuspense(NotFoundPage)} />
					</Route>
				</Routes>
			</Suspense>
		</HashRouter>
	);
}