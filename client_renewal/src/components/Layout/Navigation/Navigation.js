import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navigation.scss';
import { Wrapper } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Navigation = ({ postCount, seriesCount, current, setCurrent }) => (
	<Wrapper className={cx('navigation')}>
		{current === 'search' ? (
			<div className={cx('search-result')}>검색결과</div>
		) : (
			[
				<Link
					to="/"
					key="intro"
					className={cx('intro', current === 'intro' && 'current')}
					onClick={() => setCurrent('intro')}
				>
					블로그 소개
				</Link>,
				<Link
					to="/list"
					key="list"
					className={cx('list', current === 'list' && 'current')}
					onClick={() => setCurrent('list')}
				>
					글 {postCount}
				</Link>,
				<Link
					to="/series"
					key="series"
					className={cx('series', current === 'series' && 'current')}
					onClick={() => setCurrent('series')}
				>
					시리즈 {seriesCount}
				</Link>
			]
		)}
	</Wrapper>
);

Navigation.propTypes = {
	current: PropTypes.string,
	setCurrent: PropTypes.func
};

Navigation.defaultProps = {
	current: 'intro',
	setCurrent: () => console.warn('Warning: setCurrent is not defined')
};

export default Navigation;
