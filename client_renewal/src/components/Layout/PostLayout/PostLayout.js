import React from 'react';
import classNames from 'classnames';
import styles from './PostLayout.scss';
import HeaderContainer from 'containers/Layout/HeaderContainer';
import PostNavigation from 'components/Layout/PostNavigation';

const cx = classNames.bind(styles);

const PostLayout = ({ children }) => (
	<div className={cx('page-template')}>
		<HeaderContainer />
		<main>{children}</main>
		<PostNavigation />
	</div>
);

export default PostLayout;
