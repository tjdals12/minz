import React from 'react';
import classNames from 'classnames';
import styles from './LoginForm.scss';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { LabelInput, InputError, ButtonWrapper, Button } from 'components/common';

const cx = classNames.bind(styles);

const LoginForm = ({ errors, onChange, onSocialLogin, onLocalLogin, onOpen }) => (
	<div className={cx('login-form')}>
		<h3 className={cx('welcome-title')}>Welcome, developer</h3>

		{/* <ButtonWrapper direction="horizontal">
			<Button theme="facebook" onClick={() => onSocialLogin('facebook')}>
				<FaFacebook size={15} /> Facebook
			</Button>
			<Button theme="google" onClick={() => onSocialLogin('google')}>
				<FaGoogle size={15} /> Google
			</Button>
		</ButtonWrapper> */}

		<div className={cx('bottom-wrapper')}>
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
					type="Password"
					name="password"
					placeholder="Password"
					onChange={onChange}
					onKeyUp={(e) => {
						if (e.keyCode === 13) onLocalLogin();
					}}
					error={errors.passwordError}
				/>

				<InputError error={errors.failError} />
			</div>

			<ButtonWrapper direction="vertical">
				<Button theme="login" onClick={onLocalLogin}>
					Login
				</Button>
				<Button theme="register" onClick={() => onOpen('register')}>
					Register
				</Button>
			</ButtonWrapper>
		</div>
	</div>
);

export default LoginForm;
