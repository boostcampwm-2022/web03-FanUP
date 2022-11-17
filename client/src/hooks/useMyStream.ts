import { setMyStream } from '@/store/user';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function useMyStream() {
    const dispatch = useDispatch();

    const getMedia = useCallback(async () => {
        try {
            const myStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: { facingMode: 'user' },
            });
            dispatch(setMyStream(myStream));
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getMedia();
    }, []);
}
