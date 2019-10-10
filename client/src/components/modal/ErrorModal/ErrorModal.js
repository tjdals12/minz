import React from 'react';
import styles from './ErrorModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import FaBan from 'react-icons/lib/fa/ban';

const cx = classNames.bind(styles);

const ErrorModal = ({visible, text, onHideModal}) => {
    return(
        <ModalWrapper visible={visible}>
            <div className={cx('error-modal')} onClick={onHideModal}>
                <p><FaBan /> {text}</p>
            </div>
        </ModalWrapper>
    )
}

export default ErrorModal;