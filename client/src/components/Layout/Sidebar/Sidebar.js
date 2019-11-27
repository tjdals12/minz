import React from 'react';
import classNames from 'classnames';
import styles from './Sidebar.scss';
import { FaAngleLeft, FaCog } from 'react-icons/fa';
import { Logo, Button } from 'components/common';
import Profile from './Profile';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';

// Temp
import thumbnailImg from 'assets/img/header_thumbnail.png';

const cx = classNames.bind(styles);

const Sidebar = ({ isLogin, userInfo, errors, onChange, onSocialLogin, onLocalLogin, onLogout, onOpen }) => {
	const sidebarClose = () => {
		document.querySelector('.sidebar').classList.remove('sidebar--open');
	};

	return (
		<div className={cx('sidebar')}>
			<Logo />
			<FaAngleLeft className={cx('close-btn')} onClick={sidebarClose} />

			{isLogin ? (
				<Profile userInfo={userInfo} onLogout={onLogout} onOpen={onOpen}/>
			) : (
				<LoginForm
					errors={errors}
					onChange={onChange}
					onSocialLogin={onSocialLogin}
					onLocalLogin={onLocalLogin}
					onOpen={onOpen}
				/>
			)}

			{isLogin && (
				<div className={cx('config-wrapper')}>
					<Button theme="icon" onClick={() => onOpen('blogConfig')}>
						<FaCog />
					</Button>
				</div>
			)}
		</div>
	);
};

Sidebar.propTypes = {
	isLogin: PropTypes.bool,
	userInfo: PropTypes.object,
	errors: PropTypes.object,
	onChange: PropTypes.func,
	onSocialLogin: PropTypes.func,
	onLocalLogin: PropTypes.func,
	onLogout: PropTypes.func,
	onOpen: PropTypes.func
};

Sidebar.defaultProps = {
	isLogin: false,
	errors: {
		emailError: '',
		passwordError: '',
		failError: ''
	},
	userInfo: {
		thumbnail: thumbnailImg,
		username: 'Guest',
		count: 0
	},
	onChange: () => console.warn('Warning: onChange is not defined'),
	onSocialLogin: () => console.warn('Warning: onSocialLogin is not defined'),
	onLocalLogin: () => console.warn('Warning: onLocalLogin is not defined'),
	onLogout: () => console.warn('Warning: onLogout is not defined'),
	onOpen: () => console.warn('Warning: onOpen is not defined')
};

export default Sidebar;
