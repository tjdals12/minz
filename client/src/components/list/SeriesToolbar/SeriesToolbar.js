import React from 'react';
import styles from './SeriesToolbar.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const SeriesToolbar = ({visible, onShowModal}) => {
    return(
        <div className={cx('series-toolbar')}>
            <div className={cx('search-tool')}>
                
            </div>

            {
                visible && 
                <div className={cx('button-tool')}>
                    <Button theme="small" onClick={onShowModal}>등록</Button>
                </div>
            }
            
        </div>
    )
}

export default SeriesToolbar;