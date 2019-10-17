import React from 'react';
import classNames from 'classnames';
import styles from './PostComment.scss';
import { Wrapper } from 'components/common';
import { FaComment } from 'react-icons/fa';
import CommentInput from './CommentInput';
import Comment from './Comment';
import CommentPagination from './CommentPagination';
import PropTypes from 'prop-types';

const demo = [
	{
		_id: '0',
		writer: 'Seongmin',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		publishedDate: 'Saturday, April 6, 2019 9:57 PM'
	},
	{
		_id: '1',
		writer: 'Jongoh',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		publishedDate: 'Saturday, April 6, 2019 9:57 PM'
	},
	{
		_id: '2',
		writer: 'Seohyu',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		publishedDate: 'Saturday, April 6, 2019 9:57 PM'
	},
	{
		_id: '3',
		writer: 'Chanhui',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		publishedDate: 'Saturday, April 6, 2019 9:57 PM'
	}
];

const cx = classNames.bind(styles);

const PostComment = ({ commentCount, comments }) => {
	const commentList = comments.map((comment) => {
		const { _id, content, writer, publishedDate } = comment;

		return (
			<Comment
				key={_id}
				id={_id}
				writer={writer}
				content={content}
				isDelete={false}
				publishedDate={publishedDate}
			/>
		);
	});

	return (
		<Wrapper className={cx('post-comment')}>
			<div className={cx('comment-count')}>
				<FaComment color="#228be6" />
				<h1>{commentCount}</h1>
			</div>

			<CommentInput />

			<div className={cx('comment-list')}>{commentList}</div>

			<CommentPagination />
		</Wrapper>
	);
};

PostComment.propTypes = {
	commentCount: PropTypes.number,
	comments: PropTypes.array
};

PostComment.defaultProps = {
	commentCount: 0,
	comments: demo
};

export default PostComment;
