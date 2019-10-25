import { Map, fromJS, List } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_COMMENTS = 'comment/GET_COMMENTS';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const SET_TARGET = 'comment/SET_TARGET';

export const getComments = createAction(GET_COMMENTS, api.getComments);
export const writeComment = createAction(WRITE_COMMENT, api.writeComment);
export const deleteComment = createAction(DELETE_COMMENT, api.deleteComment);
export const setTarget = createAction(SET_TARGET);

const initialState = Map({
	comments: List(),
	count: 0,
	lastPage: 1,
	target: ''
});

export default handleActions(
	{
		...pender({
			type: GET_COMMENTS,
			onSuccess: (state, action) => {
				const { data: comments } = action.payload.data;
				const commentCount = action.payload.headers['comment-count'];
				const lastPage = action.payload.headers['last-page'];

				return state
					.set('comments', fromJS(comments))
					.set('count', parseInt(commentCount || 1, 10))
					.set('lastPage', parseInt(lastPage || 1, 10));
			}
		}),
		...pender({
			type: WRITE_COMMENT,
			onSuccess: (state, action) => {
				const { data: comment } = action.payload.data;

				return state.set('comment', fromJS(comment));
			}
		}),
		...pender({
			type: DELETE_COMMENT
		}),
		[SET_TARGET]: (state, action) => {
			const { payload } = action;

			return state.set('target', payload);
		}
	},
	initialState
);
