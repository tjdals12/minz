import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';

const reducer = combineReducers(modules);
const middlewares = [ penderMiddleware() ];

const isDev = process.env.NODE_ENV === 'development';
const devTool = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTool || compose;

const configure = (preloadState) =>
	createStore(reducer, preloadState, composeEnhancers(applyMiddleware(...middlewares)));

export default configure;
