import { useGetUserQuery } from '@services/user.service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCheckLogin = () => {
    const { data: UserData, isLoading } = useGetUserQuery();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && !UserData) {
            alert('로그인 후 이용할 수 있는 서비스입니다');
            return navigate('/');
        }
    }, [isLoading]);
    return isLoading;
};
