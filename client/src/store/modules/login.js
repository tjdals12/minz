import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import social from 'lib/social';
import * as api from 'lib/api';

const CHANGE_INPUT = 'login/CHANGE_INPUT';
const LOGIN_LOCAL = 'login/LOGIN_LOCAL';
const LOGOUT = 'login/LOGOUT';
const LOGIN_CHECK = 'login/LOGIN_CHECK';
const SET_ERRORS = 'login/SET_ERRORS';
const PROVIDER_LOGIN = 'login/PROVIER_LOGIN';
const SOCIAL_LOGIN = 'login/SOCIAL_LOGIN';

export const changeInput = createAction(CHANGE_INPUT);
export const loginLocal = createAction(LOGIN_LOCAL, api.loginLocal);
export const logout = createAction(LOGOUT, api.logout);
export const loginCheck = createAction(LOGIN_CHECK, api.loginCheck);
export const setErrors = createAction(SET_ERRORS);
export const providerLogin = createAction(PROVIDER_LOGIN, (provider) => social[provider](), provider => provider);
export const socialLogin = createAction(SOCIAL_LOGIN, api.loginSocial);

const initialState = Map({
    form : Map({
        email : "",
        password : "",
    }),
    login : Map({
        isLogin : false,
        id : "",
        username : "",
        thumbnail : "",
        thoughCount : 0
    }),
    error : null,
    redirectToRegister: false,
    socialInfo: Map({})
})

export default handleActions({
    [CHANGE_INPUT] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['form', name], value);
    },
    [SET_ERRORS] : (state, action) => {
        return state.set('error', fromJS(action.payload));
    },
    ...pender({
        type : LOGOUT,
        onSuccess : (state, action) => initialState
    }),
    ...pender({
        type : LOGIN_LOCAL,
        onSuccess : (state, action) => {
            const { data } = action.payload;
            return state.setIn(['form', 'password'], "")
                        .setIn(['login', 'isLogin'], true)
                        .setIn(['login', 'id'], data.id)
                        .setIn(['login', 'username'], data.profile.username)
                        .setIn(['login', 'thumbnail'], data.profile.thumbnail)
                        .setIn(['login', 'thoughCount'], data.thoughCount)
                        .set('error', null);
        },
        onFailure : (state, action) => {
            return state.set('error', fromJS({
                fail: ["이메일 또는 비밀번호가 일치하지 않습니다."]
            }));
        }
    }),
    ...pender({
        type : LOGIN_CHECK,
        onSuccess : (state, action) => {
            const { data } = action.payload;
            return state.setIn(['login', 'isLogin'], true)
                        .setIn(['login', 'id'], data.id)
                        .setIn(['login', 'username'], data.profile.username)
                        .setIn(['login', 'thumbnail'], data.profile.thumbnail)
                        .setIn(['login', 'thoughCount'], data.thoughCount);
        }
    }),
    ...pender({
        type: PROVIDER_LOGIN,
        onSuccess: (state, action) => {
            const {
                payload: accessToken,
                meta: provider
            } = action;

            return state.set('socialInfo', Map({
                accessToken,
                provider
            }));
        }
    }),
    ...pender({
        type: SOCIAL_LOGIN,
        onSuccess: (state, action) => {
            const { data } = action.payload;
            
            if(action.payload.status === 204){
                return state.set('redirectToRegister', true);
            }

            return state.setIn(['form', 'password'], "")
                        .setIn(['login', 'isLogin'], true)
                        .setIn(['login', 'id'], data.id)
                        .setIn(['login', 'username'], data.profile.username)
                        .setIn(['login', 'thumbnail'], data.profile.thumbnail)
                        .set('error', null)
                        .set('redirectToRegister', false);
        }
    })
}, initialState);