import React from 'react';
import classNames from 'classnames';
import styles from './PostLayout.scss';
import SidebarContainer from 'containers/Layout/SidebarContainer';
import HeaderContainer from 'containers/Layout/HeaderContainer';
import PostNavigationContainer from 'containers/Layout/PostNavigationContainer';
import RegisterModalContainer from 'containers/Modal/RegisterModalContainer';
import WelcomeModalContainer from 'containers/Modal/WelcomeModalContainer';

const cx = classNames.bind(styles);

const PostLayout = ({ children }) => (
	<div className={cx('page-template')}>
		<SidebarContainer />
		<HeaderContainer />
		<main>{children}</main>
		<PostNavigationContainer />

		<RegisterModalContainer />
		<WelcomeModalContainer />
	</div>
);

export default PostLayout;
