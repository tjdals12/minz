import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Header.scss';
import { Link } from 'react-router-dom';
import { FaSearch, FaBars } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import Thumbnail from 'components/common/Thumbnail';

// Temp
import background from 'assets/img/header_background.jpg';
import headerThumbnail from 'assets/img/header_thumbnail.png';

const cx = classNames.bind(styles);

const Brand = () => (
	<div className={cx('brand')}>
		<span className={cx('side-menu-icon')}>
			<FaBars />
		</span>
		<Link className={cx('home')} to="/">
			Minz Log.<span>beta</span>
		</Link>
	</div>
);

const HeaderTitle = ({ title }) => (
	<div className={cx('header-title')}>
		<div>{title}</div>
	</div>
);

const Search = () => {
	const [ searchBar, setSearchBar ] = useState(false);

	const onToggleSearchBar = () => {
		setSearchBar(!searchBar);
	};

	return (
		<div className={cx('search')}>
			<CSSTransition in={searchBar} timeout={300} classNames="searchBar">
				<input name="keyword" className={cx('keyword')} placeholder="포스트" />
			</CSSTransition>
			<span className={cx('search-icon')} onClick={onToggleSearchBar}>
				<FaSearch size={25} />
			</span>
		</div>
	);
};

const Header = () => {
	return (
		<header className={cx('header')} style={{ backgroundImage: `url(${background})` }}>
			<div className={cx('header-content')}>
				<Thumbnail url={headerThumbnail} type="user" />
				<Brand />
				<HeaderTitle title="Minz Log" />
				<Search />
			</div>
		</header>
	);
};

export default Header;
