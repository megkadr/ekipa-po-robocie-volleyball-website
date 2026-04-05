import { useEffect, useRef, useState } from 'react';

interface MovingCardsProps<T> {
	items: T[];
	renderItem: (item: T, index: number) => React.ReactNode;
	direction?: 'left' | 'right';
	speed?: 'fast' | 'normal' | 'slow';
	pauseOnHover?: boolean;
	gap?: number;
}

const speedMap = { fast: '25s', normal: '45s', slow: '70s' };

export function InfiniteMovingCards<T>({
										   items,
										   renderItem,
										   direction = 'left',
										   speed = 'slow',
										   pauseOnHover = true,
										   gap = 24,
									   }: MovingCardsProps<T>) {
	const scrollerRef = useRef<HTMLDivElement>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const id = requestAnimationFrame(() => setReady(true));
		return () => cancelAnimationFrame(id);
	}, []);

	const duration = speedMap[speed];
	const animationDirection = direction === 'right' ? 'reverse' : 'normal';

	const doubled = [...items, ...items];

	return (
		<div
			style={{
				overflow: 'hidden',
				maskImage:
					'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
				WebkitMaskImage:
					'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
			}}
		>
			<div
				ref={scrollerRef}
				style={{
					display: 'flex',
					gap: `${gap}px`,
					width: 'max-content',
					padding: '16px 0',
					animation: ready
						? `infiniteScroll ${duration} linear infinite ${animationDirection}`
						: 'none',
					...(pauseOnHover ? {} : {}),
				}}
				className={pauseOnHover ? 'hover-pause' : ''}
			>
				{doubled.map((item, index) => (
					<div key={index} style={{ flexShrink: 0 }}>
						{renderItem(item, index % items.length)}
					</div>
				))}
			</div>

			<style>{`
        @keyframes infiniteScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hover-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
		</div>
	);
}