import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { PostInfo, PostBody } from 'components/post';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from 'store/modules/post';
import { open, setType } from 'store/modules/modal';

const PostContainer = ({ match }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.getIn([ 'userInfo', 'profile', 'username' ]), []);
	const post = useSelector((state) => state.post.get('post').toJS(), []);
	const loading = useSelector((state) => state.pender.pending['post/GET_POST'], []);

	const handleOpen = useCallback(
		(name) => {
			dispatch(setType('post'));
			dispatch(open(name));
		},
		[ dispatch ]
	);

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
				user={user}
				id={post._id}
				title={post.title}
				writer={post.writer}
				tags={post.tags}
				hit={post.hit}
				like={post.like}
				commentCount={post.comments.length}
				publishedDate={post.publishedDate}
				onOpen={handleOpen}
			/>
			<PostBody body={post.body} />
		</React.Fragment>
	);
};

export default withRouter(PostContainer);
