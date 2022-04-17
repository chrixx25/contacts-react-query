import React from 'react';
import { Navigate } from 'react-router-dom';
import Page from 'components/Page';
import { GetUser } from 'utils/cookie';

const PrivateRoute = ({ component: Component }) => {
    const isAuth = !!GetUser();

    if (!isAuth) return <Navigate to="/login" />

    return (
        <Page>
            <Component />
        </Page>
    );
}

export default PrivateRoute;