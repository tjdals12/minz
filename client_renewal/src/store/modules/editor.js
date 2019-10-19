import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const ON_CHANGE = 'editor/ON_CHANGE';
const INITIALIZE = 'editor/INITIALIZE';

export const onChange = createAction(ON_CHANGE);
export const initialize = createAction(INITIALIZE);

const initialState = Map({
	title: '',
	markdown: '',
	tags: ''
});

export default handleActions(
	{
		[ON_CHANGE]: (state, action) => {
			const { name, value } = action.payload;

			return state.set(name, value);
		},
		[INITIALIZE]: (state, action) => initialState
	},
	initialState
);
