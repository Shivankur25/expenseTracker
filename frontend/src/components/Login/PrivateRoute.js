import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user }) => {
    const token = localStorage.getItem('token');
    console.log(user, token);
    if (!user || !token) {
        return <Navigate to="/login" />;
    }

    return <Component />;
};

export default PrivateRoute;
