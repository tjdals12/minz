import React from 'react';
import classNames from 'classnames';
import styles from './ButtonWrapper.scss';

const cx = classNames.bind(styles);

const ButtonWrapper = ({ direction, children, className }) => (
	<div className={cx(`button-wrapper ${direction} ${className}`)}>{children}</div>
);

export default ButtonWrapper;
