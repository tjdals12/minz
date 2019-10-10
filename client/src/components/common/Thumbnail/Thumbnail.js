import React from 'react';
import styles from './Thumbnail.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Thumbnail = ({url, type}) => (
    <div className={cx('thumbnail', type)}>
        <img src={url} alt="Thumbnail" />
    </div>
)

export default Thumbnail;