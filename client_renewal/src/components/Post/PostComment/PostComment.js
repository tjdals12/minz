import React from 'react';
import classNames from 'classnames';
import styles from './PostComment.scss';
import { Wrapper } from 'components/common';
import { FaComment } from 'react-icons/fa';
import CommentInput from './CommentInput';
import Comment from './Comment';
import CommentPagination from './CommentPagination';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const PostComment = ({
	user,
	isLogin,
	commentCount,
	comment,
	comments,
	page,
	lastPage,
	onChange,
	onInsert,
	onPrev,
	onNext,
	onTarget,
	onOpen
}) => {
	const commentList = comments.map((comment) => {
		const { _id, content, writer, publishedDate } = comment;

		return (
			<Comment
				key={_id}
				id={_id}
				writer={writer}
				content={content}
				isDelete={user === writer}
				publishedDate={publishedDate}
				onTarget={onTarget}
				onOpen={onOpen}
			/>
		);
	});

	return (
		<Wrapper className={cx('post-comment')}>
			<div className={cx('comment-count')}>
				<FaComment color="#228be6" />
				<h1>{commentCount}</h1>
			</div>

			{isLogin && <CommentInput comment={comment} onChange={onChange} onInsert={onInsert} />}

			<div className={cx('comment-list')}>{commentList}</div>

			<CommentPagination page={page} lastPage={lastPage} onPrev={onPrev} onNext={onNext} />
		</Wrapper>
	);
};

PostComment.propTypes = {
	isLogin: PropTypes.bool,
	commentCount: PropTypes.number,
	comments: PropTypes.array
};

PostComment.defaultProps = {
	isLogin: false,
	commentCount: 0,
	comments: []
};

export default PostComment;
