import React, { useCallback, useState } from 'react';
import RegisterModal from 'components/Modal/RegisterModal';
import { useDispatch, useSelector } from 'react-redux';
import { open, close } from 'store/modules/modal';
import { localRegister, onChange } from 'store/modules/auth';
import validate from 'validate.js';

const RegisterModalContainer = () => {
	const isOpen = useSelector((state) => state.modal.get('register'), []);
	const register = useSelector((state) => state.auth.get('register'), []);
	const [ errors, setErrors ] = useState({});
	const dispatch = useDispatch();

	const handleOpen = useCallback(
		(name) => {
			dispatch(open(name));
		},
		[ dispatch ]
	);

	const handleClose = useCallback(
		(name) => {
			dispatch(close(name));
		},
		[ dispatch ]
	);

	const handleChange = useCallback(
		(e) => {
			const { name, value } = e.target;

			dispatch(onChange({ target: 'register', name, value }));
		},
		[ dispatch ]
	);

	const handleRegister = useCallback(
		() => {
			const { email, password, username } = register.toJS();

			const constrains = {
				email: {
					email: {
						message: () => '^잘못된 형식의 이메일 입니다.'
					}
				},
				password: {
					length: {
						minimum: 4,
						tooShort: '^비밀번호는 %{count}자 이상 입니다.',
						maximum: 12,
						tooLong: '^비밀번호는 %{count}자 이하 입니다.'
					}
				},
				username: {
					format: {
						pattern: '[a-z0-9]+',
						flags: 'i',
						message: '^닉네임에는 특수문자를 사용할 수 없습니다.'
					}
				}
			};

			const error = validate({ email, password, username }, constrains);

			if (error) {
				const { email, password, username } = error;

				setErrors({
					emailError: email && email[0],
					passwordError: password && password[0],
					usernameError: username && username[0]
				});
				return;
			}

			dispatch(localRegister({ email, password, username }));
			handleClose('register');
			handleOpen('welcome');
		},
		[ register, dispatch, handleOpen, handleClose ]
	);

	return (
		<RegisterModal
			errors={errors}
			visible={isOpen}
			onClose={handleClose}
			onChange={handleChange}
			onRegister={handleRegister}
		/>
	);
};

export default RegisterModalContainer;
