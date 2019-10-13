import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const OPEN = 'modal/OPEN';
const CLOSE = 'modal/CLOSE';

export const open = createAction(OPEN);
export const close = createAction(CLOSE);

const initialState = Map({
	register: false,
	welcome: false
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
		}
	},
	initialState
);
