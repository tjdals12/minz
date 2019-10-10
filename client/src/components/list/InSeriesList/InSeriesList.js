import React from 'react';
import styles from './InSeriesList.scss';
import classNames from 'classnames/bind';
import Count from 'components/common/Count';
import Thumbnail from 'components/common/Thumbnail';
import Content from 'components/common/Content';
import Button from 'components/common/Button';
import MdAccessTime from 'react-icons/lib/md/access-time';
import { Link } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

const InSeriesItem = ({ id, title, body, hit, publishedDate, comments }) => {
    return(
        <div className={cx('inseries-item')}>
            <Link to={`/post/${id}`}>
                <Content
                    title={title}
                    description={body}
                    type="post" />

                <div className={cx('post-count')}>
                    <Count count={hit} share direction="horizontal">조회</Count>
                    <Count count={comments} comment direction="horizontal">댓글</Count>
                    <div className={cx('date')}><MdAccessTime />{moment(publishedDate).format('ll')}</div>
                </div>
            </Link>
        </div>
    )
}

const InSeriesList = ({username, writer, inSeries, seq}) => {

    const inSeriesList = inSeries && inSeries.map(
        post => {
            const { _id, title, body, hit, publishedDate, comments } = post.toJS();

            return(
                <InSeriesItem
                    key={_id}
                    id={_id}
                    title={title}
                    body={body}
                    hit={hit}
                    publishedDate={publishedDate}
                    comments={comments.length} />
            )
        }
    )

    return(
        <div className={cx('inseries-list')}>
            {inSeriesList.size === 0
                ? <div className={cx('empty-box')}>
                    <h1 className={cx('title')}>"현재 작성된 포스트가 없습니다.".</h1>
                    {
                        username === writer &&
                        <Button to={`/editor?series=${seq}`} theme='white'>첫 포스트 작성</Button>
                    }
                  </div>
                : <div className={cx('inseries')}>
                    <div className={cx('button-wrapper')}>
                    {
                        username === writer &&
                        <Button to={`/editor?series=${seq}`} theme='green'>이 시리즈에 포스트 추가</Button>
                    }
                    </div>
                    <div className={cx('list-wrapper')}>
                        {inSeriesList}
                    </div>
                  </div>}
        </div>
    )
}

export default InSeriesList;