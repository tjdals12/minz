import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import PostListContainer from 'containers/PostListContainer';
import PaginationContainer from 'containers/PaginationContainer';
import TagsContainer from 'containers/TagsContainer';

const ListPage = () => {
	return (
		<ScrollToTop>
			<TagsContainer />
			<PostListContainer />
			<PaginationContainer type="post" />
		</ScrollToTop>
	);
};

export default ListPage;
