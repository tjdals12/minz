import React from 'react';
import PostList from 'components/PostList';
import { useSelector } from 'react-redux';

const PostListContainer = () => {
	const posts = useSelector((state) => state.post.get('posts').toJS(), []);

	return <PostList posts={posts} />;
};

export default PostListContainer;
