import React from 'react';
import classNames from 'classnames';
import styles from './RegisterModal.scss';
import ModalWrapper from 'components/Modal/ModalWrapper';
import { Thumbnail, LabelInput, InputError, ButtonWrapper, Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const RegisterModal = ({ errors, visible, onClose, onChange, onRegister }) => {
	return (
		<ModalWrapper visible={visible}>
			<div className={cx('local-register')}>
				<div className={cx('input-wrapper')}>
					<div className={cx('left-wrapper')}>
						<Thumbnail url={require('assets/img/register-logo.png')} type="register-logo" />
					</div>

					<div className={cx('right-wrapper')}>
						<h1 className={cx('register-title')}>Register</h1>
						<div className={cx('register-form')}>
							<div className={cx('form-wrapper')}>
								<LabelInput
									label="Email"
									type="text"
									name="email"
									placeholder="Your email"
									onChange={onChange}
									error={errors.emailError}
								/>

								<LabelInput
									label="Password"
									type="password"
									name="password"
									placeholder="Password"
									onChange={onChange}
									error={errors.passwordError}
								/>

								<LabelInput
									label="Username"
									type="text"
									name="username"
									placeholder="Name (Nickname)"
									onChange={onChange}
									error={errors.usernameError}
								/>

								<InputError error={errors.failError} />
							</div>
						</div>

						<ButtonWrapper direction="vertical">
							<Button theme="register" onClick={onRegister}>
								Register
							</Button>
							<Button theme="register" onClick={() => onClose('register')}>
								Cancel
							</Button>
						</ButtonWrapper>
					</div>
				</div>
			</div>
		</ModalWrapper>
	);
};

RegisterModal.propTypes = {
	errors: PropTypes.object,
	visible: PropTypes.bool,
	onClose: PropTypes.func,
	onChange: PropTypes.func,
	onRegister: PropTypes.func
};

RegisterModal.defaultProps = {
	errors: {
		emailError: '',
		passwordError: '',
		usernameError: '',
		failError: ''
	},
	visible: false,
	onClose: () => console.warn('Warning: onClose not defined'),
	onChange: () => console.warn('Warning: onChange not defined'),
	onRegister: () => console.warn('Warning: onRegister not defined')
};

export default RegisterModal;
