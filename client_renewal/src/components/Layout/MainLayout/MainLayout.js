import React from 'react';
import classNames from 'classnames';
import styles from './MainLayout.scss';
import Header from 'components/Layout/Header';
import Sidebar from 'components/Layout/Sidebar';

const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
	return (
		<div className={cx('page-template')}>
			<Sidebar />
			<Header />
			<main>{children}</main>
		</div>
	);
};

export default MainLayout;
