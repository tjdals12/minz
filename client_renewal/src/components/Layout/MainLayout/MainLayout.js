import React from 'react';
import classNames from 'classnames';
import styles from './MainLayout.scss';

import Header from '../Header';

const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
	return (
		<div className={cx('page-template')}>
			<Header />
			<main>{children}</main>
		</div>
	);
};

export default MainLayout;
