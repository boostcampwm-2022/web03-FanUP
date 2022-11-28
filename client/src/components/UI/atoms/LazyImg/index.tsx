import React, { useCallback, useEffect, useRef } from 'react';

interface Props {
    src: string;
    alt: string;
}

const LazyImg = ({ src, alt, ...props }: Props) => {
    const imgRef = useRef<HTMLImageElement>(null);

    const observerCallback = useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLImageElement;
                    target.src = target.dataset.src as string;
                    observer.unobserve(entry.target);
                }
            });
        },
        []
    );

    useEffect(() => {
        if (!imgRef.current) return;
        const observer = new IntersectionObserver(observerCallback, {});
        observer.observe(imgRef.current);
    }, []);

    return <img data-src={src} alt={alt} ref={imgRef} {...props} />;
};

export default LazyImg;
