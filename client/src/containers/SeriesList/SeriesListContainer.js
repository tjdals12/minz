import React from 'react';
import SeriesList from 'components/SeriesList';
import { useSelector } from 'react-redux';

const SeriesListContainer = () => {
	const seriesList = useSelector((state) => state.series.get('seriesList').toJS(), []);

	return <SeriesList series={seriesList} />;
};

export default SeriesListContainer;
