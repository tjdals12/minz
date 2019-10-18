import React from 'react';
import classNames from 'classnames';
import styles from './Comment.scss';
import { Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Comment = React.memo(({ id, content, writer, isDelete, publishedDate, onTarget, onOpen }) => (
	<div className={cx('comment')}>
		<p className={cx('writer')}>{writer}</p>
		<div className={cx('content')}>
			{content.split('\n').map((value, index) => {
				return (
					<p key={index}>
						{value}
						<br />
					</p>
				);
			})}
		</div>

		<div className={cx('date')}>{publishedDate}</div>
		<div className={cx('remove-btn')}>
			{isDelete && (
				<Button
					theme="line"
					onClick={() => {
						onTarget(id);
						onOpen('askRemove');
					}}
				>
					삭제
				</Button>
			)}
		</div>
	</div>
));

Comment.propTypes = {
	id: PropTypes.string,
	content: PropTypes.string,
	writer: PropTypes.string,
	isDelete: PropTypes.bool,
	publishedDate: PropTypes.string
};

export default Comment;
