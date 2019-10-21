import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const OPEN = 'modal/OPEN';
const CLOSE = 'modal/CLOSE';
const SET_TYPE = 'modal/SET_TYPE';

export const open = createAction(OPEN);
export const close = createAction(CLOSE);
export const setType = createAction(SET_TYPE);

const initialState = Map({
	register: false,
	welcome: false,
	askRemove: false,
	seriesCreate: false,
	seriesEdit: false,
	type: ''
});

export default handleActions(
	{
		[OPEN]: (state, action) => {
			const { payload: name } = action;

			return state.set(name, true);
		},
		[CLOSE]: (state, action) => {
			const { payload: name } = action;

			return state.set(name, false);
		},
		[SET_TYPE]: (state, action) => {
			const { payload } = action;

			return state.set('type', payload);
		}
	},
	initialState
);
