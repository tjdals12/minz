import React from 'react';
import classNames from 'classnames';
import styles from './MainLayout.scss';
import HeaderContainer from 'containers/Layout/HeaderContainer';
import InfoContainer from 'containers/Layout/InfoContainer';
import Sidebar from 'components/Layout/Sidebar';

const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
	return (
		<div className={cx('page-template')}>
			<Sidebar />
			<HeaderContainer />
			<InfoContainer />
			<main>{children}</main>
		</div>
	);
};

export default MainLayout;
