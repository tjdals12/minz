import React from 'react';
import styles from './Logo.scss';
import classNames from 'classnames/bind';
import Thumbnail from 'components/common/Thumbnail';
import Content from 'components/common/Content';

const cx = classNames.bind(styles);

const Logo = () => {
    return(
    <div className={cx('side-menu-logo')}>
        <div className={cx('logo-img')}>
            <Thumbnail url={require('asset/img/side-logo.png')} type='side-logo' />
        </div>

        <Content
            title="Minz log."
            description="2019.04.27 ~ ing"
            type="side-logo" />
    </div>
    )
}

export default Logo;

