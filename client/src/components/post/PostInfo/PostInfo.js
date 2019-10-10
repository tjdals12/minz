import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
import Content from 'components/common/Content';
import Tag from 'components/common/Tag';
import Count from 'components/common/Count';
import FaHeart from 'react-icons/lib/fa/heart';
import FaComment from 'react-icons/lib/fa/comment';
import FaEye from 'react-icons/lib/fa/eye';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const PostInfo = ({ id, title, writer, tags, hit, like, commentCount, publishedDate, onShow, user }) => {

    const likeStyle = {
        color : "#e64980",
        fontSize : "1.25rem"
    }

    const commentStyle = {
        color : "#228be6",
        fontSize : "1rem"
    }

    const hitStyle = {
        fontSize : "1rem"
    }

    return(
        <div className={cx('post-info-wrapper')}>
            <div className={cx('info')}>
                <div className={cx('tags')}>
                    {
                        tags && tags.map(
                            tag => <Tag key={tag} to={`/search/${tag}`}>{tag}</Tag>
                        )
                    }
                </div>
                
                <Content
                    title={title}
                    description={moment(publishedDate).format('LLLL')}
                    type="post-info" />
                <p className={cx('post-writer')}>write by. <b>{writer}</b></p>

                <div className={cx('info-bottom')}>
                    <div className={cx('count-info')}>
                        <Count count={like} post-like ><FaHeart style={likeStyle}/></Count>
                        <Count count={commentCount} post-comment><FaComment style={commentStyle}/></Count>
                        <Count count={hit} post-hit><FaEye style={hitStyle}/></Count>
                    </div>

                    <div className={cx('button-wrapper')}>
                        {
                            user === writer && 
                            [
                                <Button key="modify" to={`/editor?postId=${id}`} theme="green" >수정</Button>,
                                <Button key="remove" onClick={onShow} >삭제</Button>
                            ]
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostInfo;