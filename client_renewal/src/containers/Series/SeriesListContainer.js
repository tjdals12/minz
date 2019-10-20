import React, { useEffect } from 'react';
import SeriesList from 'components/Series/SeriesList';
import { useSelector, useDispatch } from 'react-redux';
import { getSeriesList } from 'store/modules/series';

const SeriesListContainer = () => {
	const seriesList = useSelector((state) => state.series.get('seriesList').toJS(), []);
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(getSeriesList());
		},
		[ dispatch ]
	);

	return <SeriesList series={seriesList} />;
};

export default SeriesListContainer;
