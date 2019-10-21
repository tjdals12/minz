import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import SeriesInfoContainer from 'containers/Series/SeriesInfoContainer';
import SeriesPostsContainer from 'containers/Series/SeriesPostsContainer';

const SeriesPage = () => (
	<ScrollToTop>
		<SeriesInfoContainer />
		<SeriesPostsContainer />
	</ScrollToTop>
);

export default SeriesPage;
