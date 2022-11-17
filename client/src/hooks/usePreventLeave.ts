import { useCallback, useEffect } from 'react';

const usePreventLeave = () => {
    const preventLeave = useCallback((e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }, []);
    useEffect(() => {
        window.addEventListener('beforeunload', preventLeave);
        return () => {
            window.removeEventListener('beforeunload', preventLeave);
        };
    }, []);
};

export default usePreventLeave;
