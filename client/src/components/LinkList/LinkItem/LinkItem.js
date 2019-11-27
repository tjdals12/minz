import React from 'react';
import classNames from 'classnames/bind';
import styles from './LinkItem.scss';

const cx = classNames.bind(styles);

const LinkItem = ({ title, to, publishedDate }) => {
    return (
        <div className={cx('link-item')}>
            <span className={cx('link')} onClick={() => window.open(to)}>
                {title}
            </span>

            {/* <Link to={to}>{title}</Link> */}
            <span className={cx('date')}>{publishedDate.substr(0, 10)}</span>
        </div>
    )
}

export default LinkItem;