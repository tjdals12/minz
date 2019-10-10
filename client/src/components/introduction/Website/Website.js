import React from 'react';
import styles from './Website.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaTwitter from 'react-icons/lib/fa/twitter';

const cx = classNames.bind(styles);

const Website = () => (
    <div className={cx('website')}>
        <h2 className={cx('title')}>웹사이트</h2>
        <div className={cx('wrapper')}>
            <div className={cx('site-wrapper')}>
                <Button theme="icon"><FaFacebook /></Button>
                <Button theme="icon"><FaInstagram /></Button>
                <Button theme="icon"><FaTwitter /></Button>
            </div>

            <div className={cx('button-wrapper')}>
                <Button>제대로 물어보기</Button>
            </div>
        </div>
    </div>
)

export default Website;