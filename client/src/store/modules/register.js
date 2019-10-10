import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const INITIALIZE = 'register/INITIALIZE';
const CHANGE_INPUT = 'register/CHANGE_INPUT';
const REGISTER_LOCAL = 'register/LOCAL_REGISTER';
const REGISTER_SOCIAL = 'register/REGISTER_SOCIAL';

export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const registerLocal = createAction(REGISTER_LOCAL, api.registerLocal);
export const registerSocial = createAction(REGISTER_SOCIAL, api.registerSocial);

const initialState = Map({
    email : "",
    password : "",
    username : "",
    error : null
})

export default handleActions({
    [INITIALIZE] : (state, action) => initialState,
    [CHANGE_INPUT] : (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type : REGISTER_LOCAL,
        onSuccess : (state, action) => {
            const { data: profile } = action.payload;
            return state.set('username', profile.username);
        },
        onFailure: (state, action) => {
            return state.set('error', fromJS({
                fail: ["이메일 또는 닉네임이 중복 됩니다."]
            }))
        }
    }),
    ...pender({
        type : REGISTER_SOCIAL,
        onSuccess : (state, action) => {
            const { data: profile } = action.payload;
            return state.set('username', profile.username);
        },
        onFailure : (state, action) => {
            return state.set('error', fromJS({
                fail: ["이메일 또는 닉네임이 중복 됩니다."]
            }))
        }
    })
}, initialState);