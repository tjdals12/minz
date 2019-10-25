import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_POST = 'editor/GET_POST';
const ON_CHANGE = 'editor/ON_CHANGE';
const INITIALIZE = 'editor/INITIALIZE';

export const getPost = createAction(GET_POST, api.getPostForEdit);
export const onChange = createAction(ON_CHANGE);
export const initialize = createAction(INITIALIZE);

const initialState = Map({
	title: '',
	markdown: '',
	tags: ''
});

export default handleActions(
	{
		...pender({
			type: GET_POST,
			onSuccess: (state, action) => {
				const { data: post } = action.payload.data;

				return state.set('title', post.title).set('markdown', post.body).set('tags', post.tags.join(','));
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { name, value } = action.payload;

			return state.set(name, value);
		},
		[INITIALIZE]: (state, action) => initialState
	},
	initialState
);
