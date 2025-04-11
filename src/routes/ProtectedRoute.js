import React from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import authServices from '../services/authServices';
import { GetAuthSelector } from '../redux/selectors';

const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
    const auth = GetAuthSelector();
    const navigation = useNavigate();
    const dataUserStorage = authServices.getUserLocalStorage();
    const { isLogin } = auth;
    console.log('t', isLogin);

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    if (isAdmin && dataUserStorage.accountData.user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return <Route {...rest} element={<Element />} />;
};

export default ProtectedRoute;
