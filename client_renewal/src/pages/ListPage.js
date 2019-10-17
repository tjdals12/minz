import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import PostListContainer from 'containers/PostListContainer';
import PaginationContainer from 'containers/PaginationContainer';

const ListPage = () => {
	return (
		<ScrollToTop>
			<PostListContainer />
			<PaginationContainer />
		</ScrollToTop>
	);
};

export default ListPage;
