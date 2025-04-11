import { produce } from 'immer';
import * as types from '../types';
const initialState = {
    auth: {
        isAdmin: false,
        isLogin: false,
        error: null,
        isSendRequest: false,
    },
};

export const authReducer = (state = initialState, action) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case types.REQUEST_LOGIN:
                draftState.auth.isLogin = false;
                draftState.auth.isAdmin = false;
                draftState.auth.isSendRequest = true;
                draftState.auth.error = null;
                break;

            case types.REQUEST_LOGIN_SUCCESS:
                draftState.auth.isAdmin = true;
                draftState.auth.isLogin = true;
                draftState.auth.isSendRequest = false;
                break;

            case types.REQUEST_LOGIN_FAILED:
                draftState.auth.isAdmin = false;
                draftState.auth.isLogin = false;
                draftState.auth.isSendRequest = false;
                draftState.auth.error = action.error;
                break;

            default:
                break;
        }
    });
};
