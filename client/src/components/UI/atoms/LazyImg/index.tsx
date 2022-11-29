import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface StyledProps {
    width?: string;
    height?: string;
}
interface Props {
    src: string;
    alt: string;
    width: string;
    height: string;
}

const ImgWrapper = styled.div<StyledProps>`
    width: ${({ width }) => width};
    padding-bottom: ${({ height }) => height};
    position: relative;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

const LazyImg = ({ src, alt, width, height }: Props) => {
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

    return (
        <ImgWrapper width={width} height={height}>
            <Img data-src={src} alt={alt} ref={imgRef} />
        </ImgWrapper>
    );
};

export default LazyImg;
