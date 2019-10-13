import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Tag.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Tag = ({ children, to }) => (
	<Link className={cx('tag')} to={to}>
		{children}
	</Link>
);

Tag.propTypes = {
	children: PropTypes.oneOfType([ PropTypes.string, PropTypes.func, PropTypes.node ]),
	to: PropTypes.string
};

Tag.defaultProps = {
	to: ''
};

export default Tag;
