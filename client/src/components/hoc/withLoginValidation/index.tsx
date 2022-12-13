import { useGetUserQuery } from '@/services/user.service';
import React, { ComponentType, useEffect, useState } from 'react';

function withLoginValidation<P extends object>(Component: ComponentType<P>) {
    return function WihLoadingComponent({ ...props }) {
        const { isLoading, data: userData } = useGetUserQuery();
        const [validationComplete, setValidationComplete] = useState(false);
        useEffect(() => {
            if (!isLoading) {
                if (!userData) {
                    alert('로그인 후 이용가능합니다!!!!');
                    return window.location.replace('/');
                }
                setValidationComplete(true);
            }
        }, [isLoading, userData]);

        if (!validationComplete) return <></>;
        return <Component {...(props as P)} />;
    };
}
export default withLoginValidation;
