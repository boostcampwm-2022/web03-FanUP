import {
    useGetUserQuery,
    useSubscribeArtistMutation,
    useUnSubscribeArtistMutation,
} from '@/services/user.service';
import { useAppDispatch } from '@/store';
import { handleSubscribed } from '@/store/user';
import { useDebounce } from '@hooks/useDebounce';
import { useOptimisticUI } from '@hooks/useOptimisticUI';
import HeartIcon from '@icons/heart';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

const SubscribeBtnWrapper = styled.div<{ isSubscribe: boolean }>`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 100%;
    margin: 5px;
    left: 92px;
    top: 195px;
    //transform: translate(-50%, -50%);
    button {
        cursor: pointer;
        border: 2px solid
            ${({ theme, isSubscribe }) => (isSubscribe ? theme.PINK : theme.DARK_GRAY)};
        background: none;
        width: 32.5px;
        height: 32.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
    }
`;

interface IProps {
    isSubscribe: boolean;
    artistId: number;
}

const SubscribeBtn = (props: IProps) => {
    const [isSubscribe, setIsSubscribe, update_UI, rollBack_UI, sync_UI] = useOptimisticUI(
        props.isSubscribe
    );
    const { data: userData } = useGetUserQuery();
    const dispatch = useAppDispatch();
    const [subscribeMutation] = useSubscribeArtistMutation();
    const [unSubscribeMutation] = useUnSubscribeArtistMutation();
    const debounce = useDebounce();

    const toggleHeart = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            if (!userData) return alert('로그인 후 이용 가능합니다');

            update_UI();
            debounce(async () => {
                //TODO: server request logic
                sync_UI();
                try {
                    if (isSubscribe) await unSubscribeMutation(props.artistId);
                    else await subscribeMutation(props.artistId);

                    dispatch(handleSubscribed());
                } catch (err) {
                    rollBack_UI();
                }
            }, 250);
        },
        [isSubscribe, userData]
    );

    useEffect(() => {
        setIsSubscribe(props.isSubscribe);
    }, [props.isSubscribe]);
    return (
        <SubscribeBtnWrapper isSubscribe={isSubscribe}>
            <button onClick={toggleHeart}>
                <HeartIcon isSubscribe={isSubscribe} />
            </button>
        </SubscribeBtnWrapper>
    );
};

export default SubscribeBtn;
