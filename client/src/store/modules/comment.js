import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_COMMENT_LIST = 'comment/GET_COMMENT_LIST';
const WRITE_COMMENT = 'comment/WRITE_COMMENT';
const CHANGE_INPUT = 'comment/CHANGE_INPUT';
const TARGET_SETTING = 'comment/TARGET_SETTING';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';

export const getCommentList = createAction(GET_COMMENT_LIST, api.getCommentList);
export const writeComment = createAction(WRITE_COMMENT, api.writeComment);
export const changeInput = createAction(CHANGE_INPUT);
export const targetSetting = createAction(TARGET_SETTING);
export const deleteComment = createAction(DELETE_COMMENT, api.deleteComment);

const initialsState = Map({
    content : "",
    comments : List(),
    commentCount : 0,
    lastPage : 1,
    target : null
})

export default handleActions({
    ...pender({
        type : GET_COMMENT_LIST,
        onSuccess : (state, action) => {
            const { data : comments } = action.payload;
            const commentCount = action.payload.headers['comment-count'];
            const lastPage = action.payload.headers['last-page'];

            return state.set('comments', fromJS(comments))
                        .set('commentCount', parseInt(commentCount, 10))
                        .set('lastPage', parseInt(lastPage, 10))
                        .set('content', '');
        }
    }),
    [CHANGE_INPUT] : (state, action) => {
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    [TARGET_SETTING] : (state, action) => {
        const { target } = action.payload;
        return state.set('target', target);
    }
}, initialsState)