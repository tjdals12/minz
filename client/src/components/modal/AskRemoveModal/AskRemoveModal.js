import React from 'react';
import styles from './AskRemoveModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';
import { CSSTransition } from 'react-transition-group';

const cx = classNames.bind(styles);

const AskRemoveModal = ({onPostRemove, onCommentRemove, onHide, visible, type}) => {

    return(
        <CSSTransition
            in={visible}
            timeout={150}
            classNames="remove">
            <ModalWrapper visible={visible}>
                <div className={cx('question')}>
                    <div className={cx('title')}>{type === "post" ? "포스트 삭제" : "댓글 삭제"}</div>
                    <div className={cx('description')}>{type === "post" ? "포스트를" : "댓글을"} 정말 삭제하시겠습니까?</div>
                </div>

                <div className={cx('options')}>
                    <Button onClick={onHide}>취소</Button>
                    {
                        type === "post" ?
                        <Button onClick={onPostRemove} theme='green'>삭제</Button> :
                        <Button onClick={onCommentRemove} theme='green'>삭제</Button>
                    }
                    
                </div>
            </ModalWrapper>
        </CSSTransition>
    )
}

export default AskRemoveModal;