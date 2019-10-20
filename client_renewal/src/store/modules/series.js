import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

const GET_SERIES_LIST = 'series/GET_SERIES_LIST';
const CREATE_SERIES = 'series/CREATE_SERIES';

export const getSeriesList = createAction(GET_SERIES_LIST, api.getSeriesList);
export const createSeries = createAction(CREATE_SERIES, api.createSeries);

const initialState = Map({
	seriesList: List(),
	series: Map(),
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
			type: CREATE_SERIES,
			onSuccess: (state, action) => {
				const { data: series } = action.payload.data;

				return state.set('series', fromJS(series));
			}
		})
	},
	initialState
);
