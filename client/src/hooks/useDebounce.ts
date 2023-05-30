import { useRef } from 'react';

export function useDebounce() {
    const timer = useRef<NodeJS.Timeout | null>(null);
    return (callback: () => void, timeOut: number) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            callback();
        }, timeOut);
    };
}
