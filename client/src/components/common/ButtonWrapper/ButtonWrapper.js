import React from 'react';
import classNames from 'classnames';
import styles from './ButtonWrapper.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const ButtonWrapper = ({ direction, children, className }) => (
	<div className={cx(`button-wrapper ${direction} ${className}`)}>{children}</div>
);

ButtonWrapper.propTypes = {
	direction: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string
};

ButtonWrapper.defaultProps = {
	direction: '',
	className: ''
};

export default ButtonWrapper;
