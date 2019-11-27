import React from 'react';
import classNames from 'classnames';
import styles from './Profile.scss';
import { Button, Thumbnail } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Profile = ({ userInfo, onLogout, onOpen }) => (
	<div className={cx('user-profile')}>
		<Thumbnail url={userInfo.profile.thumbnail} type="side-user" />
		<div className={cx('description')}>
			<p className={cx('my-name')}>{userInfo.profile.username}</p>
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

		<div className={cx('button-wrapper')}>
			<Button theme="small" onClick={() => onOpen('linkAdd')}>
				링크 추가
			</Button>
		</div>
	</div>
);

Profile.propTypes = {
	userInfo: PropTypes.object,
	onLogout: PropTypes.func
};

Profile.defaultProps = {
	userInfo: {
		profile: {
			thumbnail: '',
			username: ''
		},
		count: 0
	},
	onLogout: () => console.warn('Warning: onLogout is not defined')
};

export default Profile;
