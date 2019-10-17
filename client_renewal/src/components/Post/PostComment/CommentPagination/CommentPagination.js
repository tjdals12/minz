import React from 'react';
import classNames from 'classnames';
import styles from './CommentPagination.scss';
import { Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const CommentPagination = ({ onPrev, onNext, page, lastPage }) => (
	<div className={cx('pagination')}>
		<Button disabled={page === 1} theme="small" onClick={onPrev}>
			Prev
		</Button>
		<div className={cx('number')}>
			<p className={cx('active')}>{lastPage === 0 ? 0 : page}</p>
			<p>/</p>
			<p>{lastPage}</p>
		</div>
		<Button disabled={page === lastPage} theme="small" onClick={onNext}>
			Next
		</Button>
	</div>
);

CommentPagination.propTypes = {
	page: PropTypes.number,
	lastPage: PropTypes.number,
	onPrev: PropTypes.func,
	onNext: PropTypes.func
};

CommentPagination.defaultProps = {
	page: 1,
	lastPage: 1,
	onPrev: () => console.warn('Warning: onPrev is not defined'),
	onNext: () => console.warn('Warning: onNext is not defined')
};

export default CommentPagination;
