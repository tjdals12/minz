import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const SET_KEYWORD = 'list/SET_KEYWORD';
const GET_POST_LIST = 'list/GET_POST_LIST';
const GET_SEARCH_LIST = 'list/GET_SEARCH_LIST';

export const setKeyword = createAction(SET_KEYWORD);
export const getPostList = createAction(GET_POST_LIST, api.getPostList, meta => meta);
export const getSearchList = createAction(GET_SEARCH_LIST, api.getSearchList);

const initialState = Map({
    posts : List(),
    keyword : "",
    lastPage : null
})

export default handleActions({
    [SET_KEYWORD] : (state, action) => {
        const { name, value } = action.payload;

        return state.set(name, value);
    },
    ...pender({
        type : GET_POST_LIST,
        onSuccess : (state, action) => {
            const { data: posts } = action.payload;
            const lastPage = action.payload.headers['last-page'];

            return state.set('posts', fromJS(posts))
                        .set('lastPage', parseInt(lastPage, 10));
        }
    }),
    ...pender({
        type : GET_SEARCH_LIST,
        onSuccess : (state, action) => {
            const { searchPost: posts } = action.payload.data;
            
            return state.set('posts', fromJS(posts))
        }
    })
}, initialState);