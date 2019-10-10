import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Pagination = ({type, tag, page, lastPage}) => {
    const createPagePath = (type, page) => {
        if(type === "post"){
            return `/list/${page}`
        }else{
            return `/series/list/${page}`
        }
        
    }

    return(
        <div className={cx('list-pagination')}>
        {
            (page === lastPage || lastPage < 1)
            || <Button theme='green' to={createPagePath(type, parseInt(page, 10) + 1)}>더보기</Button>
        }
        </div>
    )
}

export default Pagination;