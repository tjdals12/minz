import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import AskRemoveModal from 'components/modal/AskRemoveModal';
import { useSelector, useDispatch } from 'react-redux';
import { close } from 'store/modules/modal';
import { deletePost } from 'store/modules/post';
import { getComments, deleteComment } from 'store/modules/comment';

const AskRemoveModalContainer = ({ history }) => {
	const isOpen = useSelector((state) => state.modal.get('askRemove'), []);
	const modalType = useSelector((state) => state.modal.get('type'), []);
	const postId = useSelector((state) => state.post.getIn([ 'post', '_id' ]), []);
	const commentId = useSelector((state) => state.comment.get('target'), []);
	const dispatch = useDispatch();

	const handleClose = useCallback(
		(name) => {
			dispatch(close(name));
		},
		[ dispatch ]
	);

	const handlePostRemove = useCallback(
		() => {
			dispatch(deletePost(postId));
			handleClose('askRemove');
			history.goBack();
		},
		[ dispatch, postId, handleClose, history ]
	);

	const handleCommentRemove = useCallback(
		() => {
			dispatch(deleteComment(commentId));
			dispatch(getComments(postId));
			handleClose('askRemove');
		},
		[ dispatch, commentId, postId, handleClose ]
	);

	return (
		<AskRemoveModal
			visible={isOpen}
			type={modalType}
			onClose={handleClose}
			onCommentRemove={handleCommentRemove}
			onPostRemove={handlePostRemove}
		/>
	);
};

export default withRouter(AskRemoveModalContainer);
