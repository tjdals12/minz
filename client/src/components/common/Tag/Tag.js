import React from 'react';
import styles from './Tag.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Tag = ({children, to=""}) => (
    <Link className={cx('tag')} to={to}>
        {children}
    </Link>
)

export default Tag;