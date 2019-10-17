import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_POSTS = 'post/GET_POSTS';

export const getPosts = createAction(GET_POSTS, api.getPosts);

const initialState = Map({
	posts: List(),
	lastPage: 1
});

export default handleActions(
	{
		...pender({
			type: GET_POSTS,
			onSuccess: (state, action) => {
				const { data: posts } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('posts', fromJS(posts)).set('lastPage', parseInt(lastPage, 10));
			}
		})
	},
	initialState
);
