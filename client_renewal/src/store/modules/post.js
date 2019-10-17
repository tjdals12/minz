import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_POSTS = 'post/GET_POSTS';
const GET_POST = 'post/GET_POST';

export const getPosts = createAction(GET_POSTS, api.getPosts);
export const getPost = createAction(GET_POST, api.getPost);

const initialState = Map({
	posts: List(),
	post: Map(),
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
		}),
		...pender({
			type: GET_POST,
			onSuccess: (state, action) => {
				const { data: post } = action.payload.data;

				return state.set('post', fromJS(post));
			}
		})
	},
	initialState
);
