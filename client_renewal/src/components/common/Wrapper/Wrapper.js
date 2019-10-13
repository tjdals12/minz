import React from 'react';
import classNames from 'classnames';
import styles from './Wrapper.scss';

const cx = classNames.bind(styles);

const Wrapper = ({ className, style, children }) => (
	<div className={cx('wrapper', className)} style={style}>
		{children}
	</div>
);

export default Wrapper;
