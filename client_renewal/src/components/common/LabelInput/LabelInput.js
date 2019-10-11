import React from 'react';
import classNames from 'classnames';
import styles from './LabelInput.scss';
import InputError from 'components/common/InputError';

const cx = classNames.bind(styles);

const LabelInput = ({ label, error, ...rest }) => (
	<div className={cx('label-input')}>
		<p className={cx('label')}>{label}</p>
		<input className={cx('input')} {...rest} />
		<InputError error={error} />
	</div>
);

export default LabelInput;
