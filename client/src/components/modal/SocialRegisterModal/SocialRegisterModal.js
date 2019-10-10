import React from 'react';
import styles from './SocialRegisterModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import InputError from 'components/common/InputError';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const SocialRegisterModal = ({ usernameError, failError, visible, provider, onHideModal, onChangeInput, onSocialRegister }) => {
    return(
        <ModalWrapper visible={visible}>
            <div className={cx('social-register')}>
                <div className={cx('input-wrapper')}>
                    <h1 className={cx('register-title')}>Register by {provider}</h1>

                    <div className={cx('register-form')}>
                        <p className={cx('label')}>Username</p>
                        <input type='text' name='username' className={cx('login-input')} placeholder='Name (Nickname)' onChange={(e) => onChangeInput(e)}/>
                        <InputError error={usernameError} />
                        <InputError error={failError} />
                    </div>

                    <div className={cx('social-button')}>
                            <Button theme='register' onClick={onSocialRegister}>Register</Button>
                            <Button theme='register' onClick={onHideModal}>Cancel</Button>
                        </div>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default SocialRegisterModal;