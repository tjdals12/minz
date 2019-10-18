import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from 'components/Layout/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { open } from 'store/modules/modal';
import { localLogin, checkLogin, logout } from 'store/modules/auth';

const SidebarContainer = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const dispatch = useDispatch();

	const isLogin = useSelector((state) => state.auth.get('isLogin'), []);
	const userInfo = useSelector((state) => state.auth.get('userInfo').toJS(), []);

	const handleChange = useCallback((e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'email':
				setEmail(value);
				return;
			case 'password':
				setPassword(value);
				return;
			default:
				return;
		}
	}, []);

	const handleLocalLogin = useCallback(
		() => {
			dispatch(localLogin({ email, password }));
			setEmail('');
			setPassword('');
		},
		[ email, password, dispatch ]
	);

	const handleLogout = useCallback(
		() => {
			dispatch(logout());
		},
		[ dispatch ]
	);

	const handleOpen = useCallback(
		(name) => {
			document.querySelector('.sidebar').classList.remove('sidebar--open');
			dispatch(open(name));
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			dispatch(checkLogin());
		},
		[ dispatch ]
	);

	return (
		<Sidebar
			isLogin={isLogin}
			userInfo={userInfo}
			onChange={handleChange}
			onLocalLogin={handleLocalLogin}
			onLogout={handleLogout}
			onOpen={handleOpen}
		/>
	);
};

export default SidebarContainer;
