import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { PostComment } from 'components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, writeComment, setTarget } from 'store/modules/comment';
import { open, setType } from 'store/modules/modal';

const PostCommentContainer = ({ match }) => {
	const [ page, setPage ] = useState(1);
	const [ comment, setComment ] = useState('');
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.getIn([ 'userInfo', 'profile', 'username' ]), []);
	const isLogin = useSelector((state) => state.auth.get('isLogin'), []);
	const comments = useSelector((state) => state.comment.get('comments').toJS(), []);
	const count = useSelector((state) => state.comment.get('count'), []);
	const lastPage = useSelector((state) => state.comment.get('lastPage'), []);

	const handleInsert = useCallback(
		() => {
			const { id } = match.params;

			dispatch(writeComment({ postId: id, content: comment }));
			setComment('');
			dispatch(getComments(id, 1));
		},
		[ match, comment, dispatch ]
	);

	const handlePrev = useCallback(
		(page) => {
			const { id } = match.params;

			if (page === 0) return;

			dispatch(getComments(id, page));
			setPage(page);
		},
		[ match, dispatch ]
	);

	const handleNext = useCallback(
		(page) => {
			const { id } = match.params;

			if (page > lastPage) return;

			dispatch(getComments(id, page));
			setPage(page);
		},
		[ match, lastPage, dispatch ]
	);

	const handleOpen = useCallback(
		(name) => {
			dispatch(setType('comment'));
			dispatch(open(name));
		},
		[ dispatch ]
	);

	const handleTarget = useCallback(
		(id) => {
			dispatch(setTarget(id));
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			const { id } = match.params;
			dispatch(getComments(id, 1));
		},
		[ match, dispatch ]
	);

	return (
		<PostComment
			user={user}
			isLogin={isLogin}
			commentCount={count}
			comment={comment}
			comments={comments}
			page={page}
			lastPage={lastPage}
			onChange={setComment}
			onInsert={handleInsert}
			onPrev={handlePrev}
			onNext={handleNext}
			onTarget={handleTarget}
			onOpen={handleOpen}
		/>
	);
};

export default withRouter(PostCommentContainer);
