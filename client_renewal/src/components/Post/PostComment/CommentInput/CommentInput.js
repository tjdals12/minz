import React from 'react';
import classNames from 'classnames';
import styles from './CommentInput.scss';
import { Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const CommentInput = React.memo(({ comment, onChange, onInsert }) => (
	<div className={cx('comment-input')}>
		<textarea
			name="content"
			placeholder="궁금한 것이 있나요? 댓글을 달아주세요."
			onChange={(e) => onChange(e.target.value)}
			value={comment}
		/>
		<div className={cx('comment-btn')}>
			<Button theme="small" onClick={onInsert}>
				확인
			</Button>
		</div>
	</div>
));

CommentInput.propTypes = {
	comment: PropTypes.string,
	onChange: PropTypes.func,
	onInsert: PropTypes.func
};

CommentInput.defaultProps = {
	onChange: () => console.warn('Warning onChnage is not defined'),
	onInsert: () => console.warn('Warning onInsert is not defined')
};

export default CommentInput;
