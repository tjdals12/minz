import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

const GET_SERIES_LIST = 'series/GET_SERIES_LIST';
const GET_KEYWORDS = 'series/GET_KEYWORDS';
const CREATE_SERIES = 'series/CREATE_SERIES';
const GET_SERIES = 'series/GET_SERIES';
const WRITE_POST_IN_SERIES = 'series/WRITE_POST_IN_SERIES';
const UPDATE_SERIES = 'series/UPDATE_SERIES';
const TOGGLE_DISP_GB = 'series/TOGGLE_DISP_GB';
const ON_CHANGE = 'series/ON_CHANGE';

export const getSeriesList = createAction(GET_SERIES_LIST, api.getSeriesList);
export const getKeywords = createAction(GET_KEYWORDS, api.getKeywords);
export const createSeries = createAction(CREATE_SERIES, api.createSeries);
export const getSeries = createAction(GET_SERIES, api.getSeries);
export const writePostInSeries = createAction(WRITE_POST_IN_SERIES, api.writePostInSeries);
export const updateSeries = createAction(UPDATE_SERIES, api.updateSeries);
export const toggleDispGb = createAction(TOGGLE_DISP_GB, api.toggleDispGb);
export const onChange = createAction(ON_CHANGE);

const initialState = Map({
	seriesList: List(),
	keywords: List(),
	series: Map(),
	posts: List(),
	edit: Map({
		thumbnail: '',
		name: '',
		description: '',
		keyword: '',
		writer: ''
	}),
	lastPage: 1
});

export default handleActions(
	{
		...pender({
			type: GET_SERIES_LIST,
			onSuccess: (state, action) => {
				const { data: seriesList } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('seriesList', fromJS(seriesList)).set('lastPage', parseInt(lastPage || 1, 10));
			}
		}),
		...pender({
			type: GET_KEYWORDS,
			onSuccess: (state, action) => {
				const { data: keywords } = action.payload.data;

				return state.set('keywords', fromJS(keywords));
			}
		}),
		...pender({
			type: CREATE_SERIES,
			onSuccess: (state, action) => {
				const { data: series } = action.payload.data;

				return state.set('series', fromJS(series));
			}
		}),
		...pender({
			type: GET_SERIES,
			onSuccess: (state, action) => {
				const { data: series } = action.payload.data;

				return state
					.set('series', fromJS(series))
					.set('posts', fromJS(series.post))
					.setIn([ 'edit', 'thumbnail' ], series.thumbnail)
					.setIn([ 'edit', 'name' ], series.name)
					.setIn([ 'edit', 'description' ], series.description)
					.setIn([ 'edit', 'keyword' ], series.keyword.join(','))
					.setIn([ 'edit', 'writer' ], series.writer);
			}
		}),
		...pender({
			type: WRITE_POST_IN_SERIES,
			onSuccess: (state, action) => {
				const { data: post } = action.payload.data;

				return state.set('result', fromJS(post));
			}
		}),
		...pender({
			type: UPDATE_SERIES,
			onSuccess: (state, action) => {
				const { data: series } = action.payload.data;

				return state
					.set('series', fromJS(series))
					.set('posts', fromJS(series.post))
					.setIn([ 'edit', 'thumbnail' ], series.thumbnail)
					.setIn([ 'edit', 'name' ], series.name)
					.setIn([ 'edit', 'description' ], series.description)
					.setIn([ 'edit', 'keyword' ], series.keyword.join(','))
					.setIn([ 'edit', 'writer' ], series.writer);
			}
		}),
		...pender({
			type: TOGGLE_DISP_GB,
			onSuccess: (state, action) => {
				const { data: series } = action.payload.data;

				return state.set('series', fromJS(series)).set('posts', fromJS(series.post));
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { target, name, value } = action.payload;

			return target ? state.setIn([ target, name ], value) : state.set(name, value);
		}
	},
	initialState
);
