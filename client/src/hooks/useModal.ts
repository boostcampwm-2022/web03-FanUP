import { useCallback, useState } from 'react';

type ReturnType = [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void, () => void];

export const useModal = (): ReturnType => {
    const [open, setOpen] = useState(false);
    const openModal = useCallback(() => {
        setOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setOpen(false);
    }, []);

    return [open, setOpen, openModal, closeModal];
};
