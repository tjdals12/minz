import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import SeriesInfoContainer from 'containers/Series/SeriesInfoContainer';
import SeriesPostsContainer from 'containers/Series/SeriesPostsContainer';
import SeriesEditModalContainer from 'containers/modal/SeriesEditModalContainer';

const SeriesPage = () => (
	<ScrollToTop>
		<SeriesInfoContainer />
		<SeriesPostsContainer />
		<SeriesEditModalContainer />
	</ScrollToTop>
);

export default SeriesPage;
