import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import Count from 'components/common/Count';
import Content from 'components/common/Content';
import MdAccessTime from 'react-icons/lib/md/access-time';
import { Link } from 'react-router-dom';
import moment from 'moment';


const cx = classNames.bind(styles);

const PostItem = ({id, title, body, hit, comments, publishedDate}) => {
    return(
        <div className={cx('post-item')}>
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

const PostList = ({posts}) => {
    const postList = posts.map(
        post => {
            const { _id, thumbnail, title, body, tags, hit, comments, like, publishedDate } = post.toJS();

            return(
                <PostItem
                    key={_id}
                    id={_id}
                    thumbnail={thumbnail}
                    title={title}
                    body={body}
                    hit={hit}
                    comments={comments}
                    publishedDate={publishedDate} />
            )
        }
    )

    return(
        <div className={cx('post-list')}>
            {postList}
        </div>
    )
}

export default PostList;