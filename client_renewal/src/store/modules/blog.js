import { Map, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_BLOG = 'blog/GET_BLOG';

export const getBlog = createAction(GET_BLOG, api.getBlog);

const initialState = Map({
	info: Map({})
});

export default handleActions(
	{
		...pender({
			type: GET_BLOG,
			onSuccess: (state, action) => {
				const { data: blog } = action.payload.data;

				return state.set('info', fromJS(blog));
			}
		})
	},
	initialState
);
