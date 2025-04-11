import { configureStore } from '@reduxjs/toolkit';
import deviceModeReducer from './deviceModeSlice';
import sidebarShowReducer from './showSlice';
import productsReducer from './productsSlice';
import listProductsReducer from '~/page/Products/listProductsSlice';
import cartReducer from '~/page/Cart/cartSlice';
import { createStore, applyMiddleware } from 'redux';
import createMiddlewareSaga from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import { all, spawn, call } from 'redux-saga/effects';
import { authSaga } from './auth';
import { authReducer } from './auth/reducer';

// setup middleware
const sagaMiddleware = createMiddlewareSaga();
const middleware = [sagaMiddleware];

export function* rootSagas() {
    const sagas = [authSaga];

    yield all(
        sagas.map((saga) =>
            spawn(function* () {
                while (true) {
                    try {
                        yield call(saga);
                        break;
                    } catch (e) {
                        console.log(e);
                    }
                }
            }),
        ),
    );
}

const rootReducer = combineReducers({
    devicemode: deviceModeReducer,
    showHeaderSidebar: sidebarShowReducer,
    products: productsReducer,
    listProducts: listProductsReducer,
    cart: cartReducer,
    authReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: composeWithDevTools(),
});

sagaMiddleware.run(rootSagas);

export default store;
