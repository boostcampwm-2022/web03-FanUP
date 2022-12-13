import { useGetUserQuery } from '@/services/user.service';
import React, { ComponentType } from 'react';

function withGetUser<P extends object>(Component: ComponentType<P>) {
    return function WihLoadingComponent({ ...props }) {
        const { isLoading } = useGetUserQuery();

        if (isLoading) return <></>;
        return <Component {...(props as P)} />;
    };
}
export default withGetUser;
