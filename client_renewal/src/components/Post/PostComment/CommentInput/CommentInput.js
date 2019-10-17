import React from 'react';
import classNames from 'classnames';
import styles from './CommentInput.scss';
import { Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const CommentInput = ({ onChange, onComment }) => (
	<div className={cx('comment-input')}>
		<textarea name="content" placeholder="궁금한 것이 있나요? 댓글을 달아주세요." onChange={onChange} />
		<div className={cx('comment-btn')}>
			<Button theme="small" onClick={onComment}>
				확인
			</Button>
		</div>
	</div>
);

CommentInput.propTypes = {
	onChange: PropTypes.func,
	onComment: PropTypes.func
};

CommentInput.defaultProps = {
	onChange: () => console.warn('Warning onChnage is not defined'),
	onComment: () => console.warn('Warning onComment is not defined')
};

export default CommentInput;
