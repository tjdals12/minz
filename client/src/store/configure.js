import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as modules from 'store/modules';
import penderMiddleware from 'redux-pender';

const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];

const isDev = process.env.NODE_ENV === "development";
const devTools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

const configure = (preloadState) => createStore(reducers, preloadState, composeEnhancers(applyMiddleware(...middlewares)));

export default configure;