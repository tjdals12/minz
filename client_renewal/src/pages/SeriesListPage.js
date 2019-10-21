import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import SeriesToolbarContainer from 'containers/SeriesList/SeriesToolbarContainer';
import SeriesListContainer from 'containers/SeriesList/SeriesListContainer';
import PaginationContainer from 'containers/PaginationContainer';
import SeriesCreateModalContainer from 'containers/Modal/SeriesCreateModalContainer';

const SeriesPage = () => {
	return (
		<ScrollToTop>
			<SeriesToolbarContainer />
			<SeriesListContainer />
			<PaginationContainer type="series" />
			<SeriesCreateModalContainer />
		</ScrollToTop>
	);
};

export default SeriesPage;
