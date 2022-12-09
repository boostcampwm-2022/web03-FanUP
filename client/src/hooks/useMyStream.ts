import { useGetUserQuery } from '@/services/user.service';
import { setMyStream } from '@/store/user';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export function useMyStream() {
    const dispatch = useDispatch();
    const { fanUpId } = useParams();
    const { isLoading: loginCheckLoading } = useGetUserQuery();
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
