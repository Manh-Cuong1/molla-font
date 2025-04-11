import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../types';
import { isEmpty } from 'lodash';
import authServices from '../../services/authServices';
import { CodeConstants } from '../../constants/ApiCode';
function* login({ payload }) {
    const { email, password } = payload;
    const error = null;
    try {
        const responseData = yield call(authServices.postLogin, email, password);
        if (responseData?.status === CodeConstants.success) {
            authServices.saveUserLocalStorage({
                email,
                accountData: responseData.data,
                isLogged: true,
                access_token: responseData?.data?.token,
            });
            yield put({ type: types.REQUEST_LOGIN_SUCCESS });
        }
    } catch (error) {
        yield put({ type: types.REQUEST_LOGIN_FAILED, error });
    }
}

function* logout() {
    try {
        yield authServices.clearUserLocalStorage();
        window.location.reload();
    } catch (error) {}
}

function* checkAuth() {
    const dataUser = authServices.getUserLocalStorage();
    if (!isEmpty(dataUser)) {
        yield put({ type: types.REQUEST_LOGIN_SUCCESS });
    }
}

export function* authSaga() {
    yield takeLatest(types.REQUEST_LOGIN, login);
    yield takeLatest(types.REQUEST_CHECK_AUTH, checkAuth);
    yield takeLatest(types.REQUEST_LOGOUT, logout);
}
