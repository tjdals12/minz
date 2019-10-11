import React from 'react';
import classNames from 'classnames';
import styles from './Button.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;

const Button = ({ children, to, disabled, theme = 'default', onClick }) => {
	const Element = to && !disabled ? Link : Div;

	return (
		<Element to={to} className={cx('button', theme, { disabled })} onClick={disabled ? () => null : onClick}>
			{children}
		</Element>
	);
};

Button.propTypes = {
	children: PropTypes.oneOfType([ PropTypes.string, PropTypes.func, PropTypes.node ]),
	to: PropTypes.string,
	disabled: PropTypes.bool,
	theme: PropTypes.string,
	onClick: PropTypes.func
};

Button.defaultProps = {
	children: 'Button',
	disabled: false,
	theme: 'default',
	onClick: () => console.warn('Warning: onClick is not defined')
};

export default Button;
