import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const ON_CHANGE = 'auth/ON_CHANGE';

export const localRegister = createAction(LOCAL_REGISTER, api.localRegister);
export const onChange = createAction(ON_CHANGE);

const initialState = Map({
	register: Map({
		email: '',
		password: '',
		username: ''
	})
});

export default handleActions(
	{
		...pender({
			type: LOCAL_REGISTER,
			onSuccess: (state, action) => {
				const { data: profile } = action.payload.data;

				console.log(profile);
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { target, name, value } = action.payload;

			return target ? state.setIn([ target, name ], value) : state.set(name, value);
		}
	},
	initialState
);
