import React from 'react';
import classNames from 'classnames';
import styles from './MainLayout.scss';
import HeaderContainer from 'containers/Layout/HeaderContainer';
import InfoContainer from 'containers/Layout/InfoContainer';
import NavigationContainer from 'containers/Layout/NavigationContainer';
import SidebarContainer from 'containers/Layout/SidebarContainer';
import RegisterModalContainer from 'containers/Modal/RegisterModalContainer';
import WelcomeModalContainer from 'containers/Modal/WelcomeModalContainer';
import BlogConfigModalContainer from 'containers/Modal/BlogConfigModalContainer';

const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
	return (
		<div className={cx('page-template')}>
			<SidebarContainer />
			<HeaderContainer />
			<InfoContainer />
			<NavigationContainer />
			<main>{children}</main>

			<RegisterModalContainer />
			<WelcomeModalContainer />
			<BlogConfigModalContainer />
		</div>
	);
};

export default MainLayout;