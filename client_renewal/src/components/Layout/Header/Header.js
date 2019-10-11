import React from 'react';
import classNames from 'classnames';
import styles from './Header.scss';
import { Thumbnail } from 'components/common';
import Brand from './Brand';
import Search from './Search';
import PropTypes from 'prop-types';

// Temp
import backgroundImg from 'assets/img/header_background.jpg';
import thumbnailImg from 'assets/img/header_thumbnail.png';

const cx = classNames.bind(styles);

const HeaderTitle = ({ title }) => (
	<div className={cx('header-title')}>
		<div>{title}</div>
	</div>
);

const Header = ({ background, thumbnail, title }) => {
	return (
		<header className={cx('header')} style={{ backgroundImage: `url(${background})` }}>
			<div className={cx('header-content')}>
				<Thumbnail url={thumbnail} type="user" />
				<Brand />
				<HeaderTitle title={title} />
				<Search />
			</div>
		</header>
	);
};

Header.propTypes = {
	background: PropTypes.string,
	thumbnail: PropTypes.string,
	title: PropTypes.string
};

Header.defaultProps = {
	background: backgroundImg,
	thumbnail: thumbnailImg,
	title: 'Minz log.'
};

export default Header;
