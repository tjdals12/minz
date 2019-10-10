import React from 'react';
import styles from './Loading.scss';
import classNames from 'classnames/bind';
import ReactLoading from 'react-loading';

const cx = classNames.bind(styles);

const Loading = ({ type, theme, width, height }) => (
    <div className={cx('loading-box', theme)}>
        <ReactLoading type={type} color="#228be6" height={width} width={height} />
    </div>
)

export default Loading;