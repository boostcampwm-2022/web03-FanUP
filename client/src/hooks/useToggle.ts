import { useCallback, useState } from 'react';

export function useToggle(
    state?: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void] {
    const [open, setOpen] = useState(state || false);
    const toggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);
    return [open, setOpen, toggle];
}
