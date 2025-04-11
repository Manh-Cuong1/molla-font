import * as types from '../types';

export const login = (email, password) => ({
    type: types.REQUEST_LOGIN,
    payload: {
        email,
        password,
    },
});

export const checkAuth = () => ({
    type: types.REQUEST_CHECK_AUTH,
});

export const logout = () => ({
    type: types.REQUEST_LOGOUT,
});
