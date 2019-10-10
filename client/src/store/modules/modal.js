import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

const SHOW_MODAL = 'editor/SHOW_MODAL';
const HIDE_MODAL = 'editor/HIDE_MODAL';
const DELETE_POST = 'editor/DELETE_POST';
const SET_ERRORS = 'editor/SET_ERRORS';

export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const setErrors = createAction(SET_ERRORS);
export const deletePost = createAction(DELETE_POST, api.deletePost);

const initialState = Map({
    modal : Map({
        login : false,
        remove : false,
        series : false,
        register : false,
        social : false,
        welcome : false,
        blog : false,
        error : false,
    }),
    text : "",
    type : null,
    error : null
})

export default handleActions({
    [SHOW_MODAL] : (state, action) => {
        const { modal, type } = action.payload;
        return state.setIn(['modal', modal], true)
                    .set('type', type)
                    .set('error', null);
    },
    [HIDE_MODAL] : (state, action) => {
        const { modal } = action.payload;
        return state.setIn(['modal', modal], false);
    },
    [SET_ERRORS]: (state, action) => {
        return state.set('error', fromJS(action.payload));
    },
    ...pender({
        type: DELETE_POST,
        onSuccess: (state, action) => {
            return state.setIn(['modal', 'remove'], false);
        },
        onFailure: (state, action) => {
            return state.setIn(['modal', 'remove'], false)
                        .setIn(['modal', 'error'], true)
                        .set('text', '삭제 권한이 없습니다. 본인의 글이 아닌가요..?');
        }
    })
}, initialState);