import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import PostListContainer from 'containers/PostListContainer';
import PaginationContainer from 'containers/PaginationContainer';

const SearchPage = () => (
	<ScrollToTop>
		<PostListContainer />
		<PaginationContainer type="search" />
	</ScrollToTop>
);

export default SearchPage;
