import React from 'react';
import classNames from 'classnames';
import styles from './Count.scss';

const cx = classNames.bind(styles);

const Count = ({ part, direction = 'vertical', children, count }) => (
	<div className={cx('count-box', { part }, direction)}>
		<div className={cx('title')}>{children}</div>
		<div className={cx('count')}>{count}</div>
	</div>
);

export default Count;
