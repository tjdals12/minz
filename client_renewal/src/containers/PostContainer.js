import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { PostInfo, PostBody, PostComment } from 'components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from 'store/modules/post';

const PostContainer = ({ match }) => {
	const dispatch = useDispatch();
	const post = useSelector((state) => state.post.get('post').toJS(), []);
	const loading = useSelector((state) => state.pender.pending['post/GET_POST'], []);

	useEffect(
		() => {
			const { id } = match.params;
			dispatch(getPost(id));
		},
		[ match, dispatch ]
	);

	return loading || loading === undefined ? null : (
		<React.Fragment>
			<PostInfo
				id={post._id}
				title={post.title}
				writer={post.writer}
				tags={post.tags}
				hit={post.hit}
				like={post.like}
				commentCount={post.comments.length}
				publishedDate={post.publishedDate}
			/>
			<PostBody body={post.body} />
			<PostComment commentCount={post.comments.length} comments={post.comments} />
		</React.Fragment>
	);
};

export default withRouter(PostContainer);
