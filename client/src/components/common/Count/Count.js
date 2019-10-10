import React from 'react';
import styles from './Count.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Count = ({children, count, part, direction = "vertical"}) => (
    <div className={cx('count-box', {part}, direction)}>
        <div className={cx('title')}>
            {children}
        </div>
        <div className={cx('count')}>
            {count}
        </div>
    </div>
)

export default Count;