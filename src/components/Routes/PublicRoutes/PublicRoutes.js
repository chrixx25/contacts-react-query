import React from 'react';
import { Navigate } from 'react-router-dom';
import { GetUser } from 'utils/cookie';

const PublicRoute = ({ component: Component }) => {
    const isAuth = !!GetUser();

    if (isAuth) return <Navigate to="/" />

    return <Component />;
}

export default PublicRoute;