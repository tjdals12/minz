import React from 'react';
import styles from './RegisterModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';
import Thumbnail from 'components/common/Thumbnail';
import InputError from 'components/common/InputError';

const cx = classNames.bind(styles);

const RegisterModal = ({visible, onHideModal, onChangeInput, onRegisterLocal, emailError, passwordError, usernameError, failError}) => {
    return(
        <ModalWrapper visible={visible}>
            <div className={cx('local-register')}>
                <div className={cx('input-wrapper')}>
                    <div className={cx('left-wrapper')}>
                        <Thumbnail url={require('asset/img/register-logo.png')} type='register-logo' />
                    </div>

                    <div className={cx('right-wrapper')}>
                        <h1 className={cx('register-title')}>Register</h1>
                        <div className={cx('register-form')}>
                            <div className={cx('form-wrapper')}>
                                <p className={cx('label')}>Email</p>
                                <input type='text' name='email' className={cx('login-input')} placeholder='Your email' onChange={(e) => onChangeInput(e)}/>
                                <InputError error={emailError} />
                                <p className={cx('label')}>Password</p>
                                <input type='password' name='password' className={cx('login-input')} placeholder='Password' onChange={(e) => onChangeInput(e)}/>
                                <InputError error={passwordError} />
                                <p className={cx('label')}>Username</p>
                                <input type='text' name='username' className={cx('login-input')} placeholder='Name (Nickname)' onChange={(e) => onChangeInput(e)}/>
                                <InputError error={usernameError} />
                                <InputError error={failError} />
                            </div>
                        </div>

                        <div className={cx('local-button')}>
                            <Button theme='register' onClick={onRegisterLocal}>Register</Button>
                            <Button theme='register' onClick={onHideModal}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default RegisterModal;