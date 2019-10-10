import React, { Component } from 'react';
import styles from './PostComment.scss';
import classNames from 'classnames/bind';
import FaComment from 'react-icons/lib/fa/comment';
import Button from 'components/common/Button';
import moment from 'moment';
import Loading from 'components/common/Loading';

const cx = classNames.bind(styles);

const Comment = ({id, content, writer, isDelete, publishedDate, onShowModal}) => {
    return(
        <div className={cx('comment')}>
            <p className={cx('writer')}>{writer}</p>
            <div className={cx('content')}>
            {
                content.split('\n').map((value, index) => {
                    return (<p key={index}>{value}<br/></p>)
                })
            }
            </div>
            
            <div className={cx('date')}>{moment(publishedDate).format('LLL')}</div>
            <div className={cx('remove-btn')} >
            {
                isDelete && 
                    <Button theme="line" onClick={() => onShowModal(id)}>삭제</Button>
            }
            </div>
        </div>
    )
}

const CommentInput = ({ onChangeInput, onComment, content}) => (
    <div className={cx('comment-input')}>
        <textarea name='content' placeholder="궁금한 것이 있나요? 댓글을 달아주세요." onChange={onChangeInput} value={content} />
        <div className={cx('comment-btn')}>
            <Button theme="small" onClick={onComment}>확인</Button>   
        </div>
    </div>
)

const Pagination = ({ onPrevPage, onNextPage, page, lastPage }) => (
    <div className={cx('pagination')}>
        <Button disabled={page === 1} theme='small' onClick={onPrevPage}>
            Prev
        </Button>
        <div className={cx('number')}>
            <p className={cx('active')}>{lastPage === 0 ? 0 : page}</p>
            <p>/</p>
            <p>{lastPage}</p>
        </div>
        <Button disabled={page === lastPage} theme='small' onClick={onNextPage}>
            Next
        </Button>
    </div>
)

class PostCommment extends Component {
    
    handleChangeInput = (e) => {
        const { name, value } = e.target;
        const { onChange } = this.props;
        onChange({name, value});
    }

    handleComment = (e) => {
        const { onComment } = this.props;
        onComment();
    }

    handlePrevPage = () => {
        const { onCommentPage, page } = this.props;
        onCommentPage(page - 1);
    }

    handleNextPage = () => {
        const { onCommentPage, page } = this.props;
        onCommentPage(page + 1);
    }

    handleShowModal = (id) => {
        const { onShowModal } = this.props;
        onShowModal(id);
    }

    render(){

        const { user, content, comments, commentCount, page, lastPage, loading } = this.props;
        const { handleChangeInput, handleComment, handlePrevPage, handleNextPage, handleShowModal } = this;
 
        const commentList = comments.map(
            comment => {
                const { _id, content, writer, publishedDate } = comment.toJS();
    
                return(
                    <Comment
                        key={_id}
                        id={_id}
                        content={content}
                        writer={writer}
                        isDelete={user === writer ? writer : ""}
                        publishedDate={publishedDate}
                        onShowModal={handleShowModal}/>
                )
            }
        )

        return(
            <div className={cx('post-comment')}>
                <div className={cx('description')}>
                    <FaComment />
                    <h1>{commentCount}</h1>
                </div>
                
                {
                    user &&
                        <CommentInput onChangeInput={handleChangeInput} onComment={handleComment} content={content}/>
                }
    
                <div className={cx('comment-list')}>
                    {loading ? <Loading type='spin' theme='comment' width='20%' height='40%'/> : commentList}
                </div>

                <Pagination onPrevPage={handlePrevPage} onNextPage={handleNextPage} page={page} lastPage={lastPage} />
            </div>
        )   
    }
}

export default PostCommment;