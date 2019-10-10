import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_POST = 'post/GET_POST';
const GET_PREV_POST = 'post/GET_PREV_POST';
const GET_NEXT_POST = 'post/GET_NEXT_POST';
const GET_COUNT = 'post/GET_COUNT';

export const getPost = createAction(GET_POST, api.getPost);
export const getPrevPost = createAction(GET_PREV_POST, api.getPrevPost);
export const getNextPost = createAction(GET_NEXT_POST, api.getNextPost);
export const getCount = createAction(GET_COUNT, api.getPostCount);

const initialState = Map({
    post : Map({}),
    navPost : Map({}),
    postCount : 0,
    todayPostCount : 0,
    commentCount : 0
})

export default handleActions({
    ...pender({
        type : GET_POST,
        onSuccess : (state, action) => {
            const { data: post } = action.payload;
            const commentCount = action.payload.headers['comment-count'];

            return state.set('post', fromJS(post))
                        .set('navPost', fromJS(post))
                        .set('commentCount', parseInt(commentCount, 10));
        }
    }),
    ...pender({
        type : GET_PREV_POST,
        onSuccess : (state, action) => {
            const { data : prevPost } = action.payload;

            if(prevPost.length === 0)
                return state.setIn(['navPost', 'title'], '이전글이 없습니다.')
                            .setIn(['navPost', 'publishedDate'], null);

            return state.set('navPost', fromJS(prevPost[0]));
        }
    }),
    ...pender({
        type : GET_NEXT_POST,
        onSuccess : (state, action) => {
            const { data : nextPost } = action.payload;

            if(nextPost.length === 0)
                return state.setIn(['navPost', 'title'], '다음글이 없습니다.')
                            .setIn(['navPost', 'publishedDate'], null);

            return state.set('navPost', fromJS(nextPost[0]));
        }
    }),
    ...pender({
        type : GET_COUNT,
        onSuccess : (state, action) => {
            const { count, todayCount } = action.payload.data;
            return state.set('postCount', count)
                        .set('todayPostCount', todayCount);
        }
    })
}, initialState);