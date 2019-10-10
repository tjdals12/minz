import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const CHANGE_INPUT = 'blog/CHANGE_INPUT';
const GET_BLOG_INFO = 'blog/GET_BLOG_INFO';
const EDIT_BLOG_INFO = 'blog/EDIT_BLOG_INFO';

export const changeInput = createAction(CHANGE_INPUT);
export const getBlogInfo = createAction(GET_BLOG_INFO, api.getBlogInfo);
export const editBlogInfo = createAction(EDIT_BLOG_INFO, api.editBlogInfo);

const initialState = Map({
    blog: Map({}),
    editInput: Map({
        background: null,
        thumbnail: null,
        title: null,
        name: null,
        description: null,
        info: null,
        tags: null
    }),
})

export default handleActions({
    [CHANGE_INPUT] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['editInput', name], value);
    },
    ...pender({
        type: GET_BLOG_INFO,
        onSuccess: (state, action) => {
            const { data: result } = action.payload;
            return state.set('blog', result);
        }
    })
}, initialState);