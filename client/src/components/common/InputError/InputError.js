import React from 'react';
import classNames from 'classnames';
import styles from './InputError.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const InputError = ({ error }) => {
	if (!error) return null;

	return <p className={cx('input-error')}>{error}</p>;
};

InputError.propTypes = {
	error: PropTypes.string
};

InputError.defaultProps = {
	error: ''
};

export default InputError;
