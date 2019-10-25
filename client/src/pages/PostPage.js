import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import PostContainer from 'containers/PostContainer';
import PostCommentContainer from 'containers/PostCommentContainer';
import AskRemoveModalContainer from 'containers/Modal/AskRemoveModalContainer';

const PostPage = () => (
	<ScrollToTop>
		<PostContainer />
		<PostCommentContainer />
		<AskRemoveModalContainer />
	</ScrollToTop>
);

export default PostPage;
