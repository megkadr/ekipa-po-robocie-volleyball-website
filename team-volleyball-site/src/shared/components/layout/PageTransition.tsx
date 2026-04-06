import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
	children: React.ReactNode;
}

/**
 * Owija zawartość strony animacją wejścia.
 * Zmiana klucza (pathname) powoduje odmontowanie i ponowne zamontowanie
 * elementu — CSS @keyframes odpala się od nowa przy każdej nawigacji.
 */
export function PageTransition({ children }: PageTransitionProps) {
	const { pathname } = useLocation();

	return (
		<div
			key={pathname}
			style={{
				animation: 'pageEnter 0.28s ease-out both',
				willChange: 'opacity, transform',
			}}
		>
			{children}
		</div>
	);
}