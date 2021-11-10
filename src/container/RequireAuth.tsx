import { Loader } from 'component/Loader';
import { useAuth } from 'hook/useAuth';
import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
    children: ReactElement;
};

export const RequireAuth = ({ children }: Props) => {
    const auth = useAuth();
    const location = useLocation();

    if (auth.userLoading) {
        return <Loader/>;
    }

    if (!auth.user) {
        return <Navigate to="/login" state={location}/>;
    }

    return children;
}