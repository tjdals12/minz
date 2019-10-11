import React from 'react';
import classNames from 'classnames';
import styles from './ButtonWrapper.scss';

const cx = classNames.bind(styles);

const ButtonWrapper = ({ direction, children }) => <div className={cx(`button-wrapper ${direction}`)}>{children}</div>;

export default ButtonWrapper;
