import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from './PageTransition';

export function Layout() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
			<Header />
			<main style={{ flex: 1 }}>
				<PageTransition>
					<Outlet />
				</PageTransition>
			</main>
			<Footer />
		</div>
	);
}