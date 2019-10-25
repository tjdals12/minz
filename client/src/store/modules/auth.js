import { Map, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const CHECK_LOGIN = 'auth/CHECK_LOGIN';
const LOGOUT = 'auth/LOGOUT';
const ON_CHANGE = 'auth/ON_CHANGE';

export const localRegister = createAction(LOCAL_REGISTER, api.localRegister);
export const localLogin = createAction(LOCAL_LOGIN, api.localLogin);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const logout = createAction(LOGOUT, api.logout);
export const onChange = createAction(ON_CHANGE);

const initialState = Map({
	register: Map({
		email: '',
		password: '',
		username: ''
	}),
	isLogin: false,
	userInfo: Map()
});

export default handleActions(
	{
		...pender({
			type: LOCAL_REGISTER
		}),
		...pender({
			type: LOCAL_LOGIN,
			onSuccess: (state, action) => {
				const { data: userInfo } = action.payload.data;

				return state.set('isLogin', true).set('userInfo', fromJS(userInfo));
			}
		}),
		...pender({
			type: CHECK_LOGIN,
			onSuccess: (state, action) => {
				const { data: userInfo } = action.payload.data;

				return userInfo
					? state.set('isLogin', true).set('userInfo', fromJS(userInfo))
					: state.set('isLogin', false);
			}
		}),
		...pender({
			type: LOGOUT,
			onSuccess: (state, action) => {
				return state.set('isLogin', false).set('userInfo', initialState.get('userInfo'));
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { target, name, value } = action.payload;

			return target ? state.setIn([ target, name ], value) : state.set(name, value);
		}
	},
	initialState
);
