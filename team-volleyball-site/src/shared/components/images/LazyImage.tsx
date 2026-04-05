import { useEffect, useRef, useState } from "react";

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	alt: string;
	errorSrc?: string;
	blurAmount?: string;
	srcSet?: string;
	sizes?: string;
};

export function LazyImage({
							  alt,
							  src,
							  srcSet,
							  sizes,
							  style,
							  blurAmount = "8px",
							  errorSrc,
							  onLoad,
							  onError,
							  className,
							  ...props
						  }: LazyImageProps) {
	const imgRef = useRef<HTMLImageElement>(null);
	const [inView, setInView] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	// IntersectionObserver — start loading only when near viewport
	useEffect(() => {
		const el = imgRef.current;
		if (!el || inView) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [inView]);

	const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		setIsLoaded(true);
		onLoad?.(e);
	};

	const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		setHasError(true);
		onError?.(e);
	};

	// Resolve actual src — fallback to errorSrc on error
	const resolvedSrc = hasError && errorSrc ? errorSrc : src;

	return (
		<img
			{...props}
			ref={imgRef}
			// Only set src when in view — prevents network request before needed
			src={inView ? resolvedSrc : undefined}
			srcSet={inView && !hasError ? srcSet : undefined}
			sizes={sizes}
			alt={alt}
			className={className}
			loading="lazy"
			decoding="async"
			fetchPriority={inView ? "auto" : "low"}
			onLoad={handleLoad}
			onError={handleError}
			style={{
				filter: isLoaded ? "none" : `blur(${blurAmount})`,
				transition: "filter 0.35s ease-out, opacity 0.35s ease-out",
				opacity: isLoaded ? 1 : 0.6,
				...style,
			}}
		/>
	);
}