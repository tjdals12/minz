import React from 'react';
import classNames from 'classnames';
import styles from './Profile.scss';
import { Button, Thumbnail } from 'components/common';

const cx = classNames.bind(styles);

const Profile = ({ userInfo, onLogout }) => (
	<div className={cx('user-profile')}>
		<Thumbnail url={userInfo.thumbnail} type="side-user" />
		<div className={cx('description')}>
			<p className={cx('my-name')}>{userInfo.username}</p>
			<p className={cx('my-post')}>내 글 : {userInfo.count}</p>
		</div>

		<div className={cx('separator-line')} />

		<div className={cx('button-wrapper')}>
			<Button theme="small" onClick={onLogout}>
				로그아웃
			</Button>
		</div>

		<div className={cx('button-wrapper')}>
			<Button theme="small" to="/editor">
				새 포스트 작성
			</Button>
		</div>
	</div>
);

export default Profile;
