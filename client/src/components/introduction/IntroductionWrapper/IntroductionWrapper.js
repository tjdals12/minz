import React from 'react';
import styles from './IntroductionWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const InstroductionWrapper = ({children}) => (
    <div className={cx('introduction-wrapper')}>
        {children}
    </div>
)

export default InstroductionWrapper;