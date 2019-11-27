import React from 'react';
import classNames from 'classnames/bind';
import styles from './LinkAddModal.scss';
import ModalWrapper from 'components/modal/ModalWrapper';
import { LabelInput, ButtonWrapper, Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const LinkAddModal = ({ visible, onClose, onChange, onAdd }) => {
    return (
        <ModalWrapper visible={visible}>
            <div className={cx('link-add')}>
                <div className={cx('input-wrapper')}>
                    <LabelInput
                        label="제목"
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={onChange}
                    />

                    <LabelInput
                        label="링크"
                        type="text"
                        name="to"
                        placeholder="Link"
                        onChange={onChange}
                    />
                </div>
                <ButtonWrapper>
                    <Button onClick={() => onAdd()}>추가</Button>
                    <Button onClick={() => onClose('linkAdd')}>취소</Button>
                </ButtonWrapper>
            </div>
        </ModalWrapper>
    )
}

LinkAddModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onAdd: PropTypes.func
}

LinkAddModal.defaultProps = {
    visible: false,
    onClose: () => console.warn('Warning: onClose is not defined'),
    onChange: () => console.warn('Warning: onChange is not defined'),
    onAdd: () => console.warn('Warning: onAdd is not defined')
}

export default LinkAddModal;
