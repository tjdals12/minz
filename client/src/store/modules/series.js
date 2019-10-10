import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const INTIIALIZE = 'series/INITIALIZE';
const CHANGE_INPUT = 'series/CHANGE_INPUT';
const CREATE_SERIES = 'series/CREATE_SERIES';
const UPDATE_SERIES = 'series/UPDATE_SERIES';
const TOGGLE_SERIES = 'series/TOGGLE_SERIES';
const GET_SERIES_LIST = 'series/GET_SERIES_LIST';
const GET_SERIES = 'series/GET_SERIES';
const GET_COUNT = 'series/GET_COUNT';

export const initialize = createAction(INTIIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const createSeries = createAction(CREATE_SERIES, api.createSeries);
export const updateSeries = createAction(UPDATE_SERIES, api.updateSeries);
export const toggleSeries = createAction(TOGGLE_SERIES, api.toggleSeries);
export const getSeriesList = createAction(GET_SERIES_LIST, api.getSeriesList, meta => meta);
export const getSeries = createAction(GET_SERIES, api.getSeries);
export const getCount = createAction(GET_COUNT, api.getSeriesCount);

const initialState = Map({
    thumb : "../../asset/img/defaultThumb.jpg",
    series : Map({}),
    inSeries : List(),
    seriesList : List(),
    seriesCount : 0,
    lastPage : null,
})

export default handleActions({
    [INTIIALIZE] : (state, action) => {
        return state.setIn(['series', 'thumb'], 'https://minz-log-image.s3.ap-northeast-2.amazonaws.com/1551000318821.jpg')
                    .setIn(['series', 'name'], '')
                    .setIn(['series', 'description'], '')
                    .setIn(['series', 'keyword'], '');
    },
    [CHANGE_INPUT] : (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['series', name], value);
    },
    ...pender({
        type: UPDATE_SERIES,
        onSuccess: (state, action) => {
            const { series } = action.payload.data;
            const { inSeries } = action.payload.data;

            return state.set('series', series)
                        .set('inSeries', fromJS(inSeries))
        }
    }),
    ...pender({
        type : GET_SERIES_LIST,
        onSuccess : (state, action) => {
            const { data: series } = action.payload;
            const lastPage = action.payload.headers['last-page'];

            return state.set('seriesList', fromJS(series))
                        .set('lastPage', parseInt(lastPage, 10));
        }
    }),
    ...pender({
        type : GET_SERIES,
        onSuccess : (state, action) => {
            const { series } = action.payload.data;
            const { inSeries } = action.payload.data;

            return state.set('series', series)
                        .set('inSeries', fromJS(inSeries));
        }
    }),
    ...pender({
        type : GET_COUNT,
        onSuccess : (state, action) => {
            const count = action.payload.data;
            return state.set('seriesCount', count);
        }
    })
}, initialState);