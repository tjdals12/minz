import React, { useEffect } from 'react';
import PostList from 'components/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from 'store/modules/post';

const PostListContainer = () => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.post.get('posts').toJS(), []);

	useEffect(
		() => {
			dispatch(getPosts(1));
		},
		[ dispatch ]
	);

	return <PostList posts={posts} />;
};

export default PostListContainer;
