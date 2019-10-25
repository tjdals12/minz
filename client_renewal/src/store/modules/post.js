import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_POSTS = 'post/GET_POSTS';
const GET_POST = 'post/GET_POST';
const WRITE_POST = 'post/WRITE_POST';
const EDIT_POST = 'post/EDIT_POST';
const DELETE_POST = 'post/DELETE_POST';
const GET_PREV_POST = 'post/GET_PREV_POST';
const GET_NEXT_POST = 'post/GET_NEXT_POST';
const SEARCH_POSTS = 'post/SEARCH_POSTS';

export const getPosts = createAction(GET_POSTS, api.getPosts);
export const getPost = createAction(GET_POST, api.getPost);
export const writePost = createAction(WRITE_POST, api.writePost);
export const editPost = createAction(EDIT_POST, api.editPost);
export const deletePost = createAction(DELETE_POST, api.deletePost);
export const getPrevPost = createAction(GET_PREV_POST, api.getPrevPost);
export const getNextPost = createAction(GET_NEXT_POST, api.getNextPost);
export const searchPosts = createAction(SEARCH_POSTS, api.searchPosts);

const initialState = Map({
	posts: List(),
	post: Map(),
	navPost: Map(),
	commentCount: 0,
	commentLastPage: 1,
	lastPage: 1,
	postCount: 0
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
				const commentCount = action.payload.headers['comment-count'];
				const lastPage = action.payload.headers['last-page'];

				return state
					.set('post', fromJS(post))
					.set('navPost', fromJS({ id: post._id, title: post.title, publishedDate: post.publishedDate }))
					.set('comment-count', parseInt(commentCount || 1, 10))
					.set('commentLastPage', parseInt(lastPage || 1, 10));
			}
		}),
		...pender({
			type: WRITE_POST
		}),
		...pender({
			type: EDIT_POST
		}),
		...pender({
			type: DELETE_POST
		}),
		...pender({
			type: GET_PREV_POST,
			onSuccess: (state, action) => {
				const { data: prevPost } = action.payload.data;

				return prevPost
					? state.set('navPost', fromJS(prevPost))
					: state.setIn([ 'navPost', 'title' ], '이전글이 없습니다.').setIn([ 'navPost', 'publishedDate' ], null);
			}
		}),
		...pender({
			type: GET_NEXT_POST,
			onSuccess: (state, action) => {
				const { data: nextPost } = action.payload.data;

				return nextPost
					? state.set('navPost', fromJS(nextPost))
					: state.setIn([ 'navPost', 'title' ], '다음글이 없습니다.').setIn([ 'navPost', 'publishedDate' ], null);
			}
		}),
		...pender({
			type: SEARCH_POSTS,
			onSuccess: (state, action) => {
				const { searchPosts, count } = action.payload.data.data;
				const lastPage = action.payload.headers['last-page'];

				return state
					.set('posts', fromJS(searchPosts))
					.set('postCount', count)
					.set('lastPage', parseInt(lastPage, 10));
			}
		})
	},
	initialState
);
