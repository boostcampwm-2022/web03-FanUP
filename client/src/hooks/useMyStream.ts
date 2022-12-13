import { setMyStream } from '@/store/user';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { useParams } from 'react-router-dom';

export function useMyStream() {
    const dispatch = useAppDispatch();
    const { fanUpId } = useParams();

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
        if (fanUpId) getMedia();
    }, [fanUpId]);
}
