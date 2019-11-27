import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_LINKS = 'link/GET_LINKS';
const GET_LINK_COUNT = 'link/GET_LINK_COUNT';
const GET_LINK = 'link/GET_LINK';
const ADD_LINK = 'link/ADD_LINK';

export const getLinks = createAction(GET_LINKS, api.getLinks);
export const getLinkCount = createAction(GET_LINK_COUNT, api.getLinkCount);
export const getLink = createAction(GET_LINK, api.getLink);
export const addLink = createAction(ADD_LINK, api.addLink);

const initialState = Map({
    links: List(),
    link: Map(),
    lastPage: 1,
    linkCount: 0
});

export default handleActions({
    ...pender({
        type: GET_LINKS,
        onSuccess: (state, action) => {
            const { data: links } = action.payload.data;
            const lastPage = action.payload.headers['last-page'];

            return state.set('links', fromJS(links))
                        .set('lastPage', parseInt(lastPage || 1, 10));
        }
    }),
    ...pender({
        type: GET_LINK_COUNT,
        onSuccess: (state, action) => {
            const { data: count } = action.payload.data;

            return state.set('linkCount', parseInt(count || 1, 10));
        }
    }),
    ...pender({
        type: GET_LINK,
        onSuccess: (state, action) => {
            const { data: link } = action.payload.data;

            return state.set('link', fromJS(link));
        }
    }),
    ...pender({
        type: ADD_LINK,
        onSuccess: (state, action) => {
            const { data: link } = action.payload.data;

            return state.set('link', fromJS(link));
        }
    })
}, initialState)