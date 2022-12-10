import { useGetUserQuery } from '@/services/user.service';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCheckArtist = () => {
    const { data: userData, isLoading } = useGetUserQuery();
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoading) return;
        if (!userData?.artistId) {
            alert('아티스트 정보를 등록 후 이용 가능합니다');
            return navigate(-1);
        }
    }, [isLoading, userData]);

    return isLoading;
};
