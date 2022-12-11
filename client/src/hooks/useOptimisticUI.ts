import { useCallback, useRef, useState } from 'react';

type ReturnType = [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    () => void,
    () => void,
    () => void
];

//Optimistic UI와 관련된 기능을 제공하는 훅
export function useOptimisticUI(initialState: boolean): ReturnType {
    const prevState = useRef<boolean | null>(initialState);
    const [state, setState] = useState(initialState);

    const update_UI = useCallback(() => {
        setState((prev) => !prev);
    }, []);

    const rollBack_UI = useCallback(() => {
        setState(prevState.current as boolean);
    }, []);

    const sync_UI = useCallback(() => {
        prevState.current = state;
    }, [state]);

    return [state, setState, update_UI, rollBack_UI, sync_UI];
}
