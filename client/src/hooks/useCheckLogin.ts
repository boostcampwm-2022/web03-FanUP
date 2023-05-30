import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCheckLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('로그인 후 이용할 수 있는 서비스입니다');
            return navigate('/');
        }
        setIsLoading(false);
    }, []);
    return isLoading;
};
