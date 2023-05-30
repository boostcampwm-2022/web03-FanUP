import { useGetUserQuery } from '@/services/user.service';
import React, { ComponentType, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function withArtistValidation<P extends object>(Component: ComponentType<P>) {
    return function WihLoadingComponent({ ...props }) {
        const { isLoading, data: userData } = useGetUserQuery();
        const navigate = useNavigate();
        const [validationComplete, setValidationComplete] = useState(false);
        useEffect(() => {
            if (!isLoading) {
                if (!userData?.artistId) {
                    alert('아티스트 정보 등록 후 이용 가능합니다.');
                    return navigate(-1);
                }
                setValidationComplete(true);
            }
        }, [isLoading, userData]);

        if (!validationComplete) return <></>;
        return <Component {...(props as P)} />;
    };
}
export default withArtistValidation;
