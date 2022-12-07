import React, { useCallback } from 'react';
import ExitIcon from '@icons/ExitIcon';
import theme from '@/style/theme';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/user';
import { resetUserService, useGetUserQuery } from '@services/user.service';
const LogOutBtn = () => {
    const dispatch = useDispatch();
    //const query = useGetUserQuery();
    //console.log(query);
    const logout = useCallback(() => {
        if (!window.confirm('로그아웃 하시겠어요?')) return;
        localStorage.removeItem('token');
        dispatch(setToken(null));
        dispatch(resetUserService());
    }, []);

    return (
        <button onClick={logout}>
            <ExitIcon fill={theme.PINK} />
        </button>
    );
};

export default LogOutBtn;
