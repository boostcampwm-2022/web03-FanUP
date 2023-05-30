import { useCallback, useState } from 'react';

type ReturnType = [
    string,
    React.Dispatch<React.SetStateAction<string>>,
    (e: React.ChangeEvent<HTMLInputElement>) => void
];

export const useInput = (initVal?: string): ReturnType => {
    const [input, setInput] = useState(initVal || '');
    const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }, []);
    return [input, setInput, onChangeInput];
};
