import React from 'react';
import classNames from 'classnames';
import styles from './MainLayout.scss';
import HeaderContainer from 'containers/Layout/HeaderContainer';
import InfoContainer from 'containers/Layout/InfoContainer';
import NavigationContainer from 'containers/Layout/NavigationContainer';
import SidebarContainer from 'containers/Layout/SidebarContainer';
import RegisterModalContainer from 'containers/modal/RegisterModalContainer';
import WelcomeModalContainer from 'containers/modal/WelcomeModalContainer';
import BlogConfigModalContainer from 'containers/modal/BlogConfigModalContainer';
import LinkAddModalContainer from 'containers/modal/LinkAddModalContainer';

const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
	return (
		<div className={cx('page-template')}>
			<SidebarContainer />

			<HeaderContainer />
			<InfoContainer />
			<NavigationContainer />			

			<main style={{ position: 'relative' }}>
				{children}
			</main>

			<RegisterModalContainer />
			<WelcomeModalContainer />
			<BlogConfigModalContainer />
			<LinkAddModalContainer />
		</div>
	);
};

export default MainLayout;
