import React from 'react';
import styles from './BlogConfigModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const BlogConfigModal = ({ visible, onHideModal, onChangeInput, onUpload, onEdit }) => {
    return(
        <ModalWrapper visible={visible}>
            <div className={cx('blog-config-modal')}>
                <div className={cx('title-wrapper')}>
                    <h1 className={cx('blog-input-title')}>블로그 정보 수정</h1>
                </div>

                <div className={cx('input-wrapper')}>
                    <p className={cx('label')}>대문 이미지</p>
                    <div className={cx('blog-input', 'file-input')}>
                        <input type='file' name='background' className={cx('file-input')} onChange={(e) => {onUpload(e.target.name, e.target.files[0])}}/>
                    </div>
                    <p className={cx('label')}>대문 타이틀</p>
                    <input type='text' name='title' className={cx('blog-input')} onChange={(e) => {onChangeInput(e.target)}}/>
                    <p className={cx('label')}>썸네일 이미지</p>
                    <div className={cx('blog-input', 'file-input')}>
                        <input type='file' name='thumbnail' className={cx('file-input')} onChange={(e) => {onUpload(e.target.name, e.target.files[0])}} />
                    </div>
                    <p className={cx('label')}>관리자 이름</p>
                    <input type='text' name='name' className={cx('blog-input')} onChange={(e) => {onChangeInput(e.target)}}/>
                    <p className={cx('label')}>관리자 설명</p>
                    <input type='text' name='description' className={cx('blog-input')} onChange={(e) => {onChangeInput(e.target)}}/>
                    <p className={cx('label')}>블로그 설명</p>
                    <textarea name='info' className={cx('blog-input', 'blog-textarea')} onChange={(e) => {onChangeInput(e.target)}}></textarea>
                    <p className={cx('label')}>태그</p>
                    <input type='text' name='tags' className={cx('blog-input')} onChange={(e) => {onChangeInput(e.target)}}/>
                </div>

                <div className={cx('button-wrapper')}>
                    <Button theme='small' onClick={onEdit}>저장</Button>
                    <Button theme='small' onClick={onHideModal}>취소</Button>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default BlogConfigModal;