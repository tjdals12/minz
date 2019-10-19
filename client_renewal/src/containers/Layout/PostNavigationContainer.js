import React from 'react';
import PostNavigation from 'components/Layout/PostNavigation';
import { useSelector, useDispatch } from 'react-redux';
import { getPrevPost, getNextPost } from 'store/modules/post';

const PostNavigationContainer = () => {
	const navPost = useSelector((state) => state.post.get('navPost').toJS(), []);
	const dispatch = useDispatch();

	const handlePrevPost = () => {
		dispatch(getPrevPost(navPost.id));
	};

	const handleNextPost = () => {
		dispatch(getNextPost(navPost.id));
	};

	return (
		<PostNavigation
			id={navPost.id}
			title={navPost.title}
			isNext={!!navPost.publishedDate}
			onPrev={handlePrevPost}
			onNext={handleNextPost}
			loading={false}
		/>
	);
};

export default PostNavigationContainer;
