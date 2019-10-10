import React from 'react';
import styles from './InputError.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const InputError = ({error}) => {
    if(!error) return null;
    return(
        <p className={cx('input-error')}>{error}</p>
    )
}

export default InputError;