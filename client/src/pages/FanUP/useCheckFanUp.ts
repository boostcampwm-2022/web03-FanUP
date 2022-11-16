import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function useCheckFanUp() {
    const { fanUpId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!fanUpId) {
            alert('비정상적인 접근입니다.');
            return navigate('/');
        }
        //TODO: FanUpId Check Logic
        setIsLoading(false);
    }, []);
    return { isLoading };
}
