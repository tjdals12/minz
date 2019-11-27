import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Navigation.scss';
import { Wrapper } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Navigation = ({ searchPostCount, postCount, seriesCount, linkCount, current }) => (
	<Wrapper className={cx('navigation')}>
		{current === 'search' ? (
			<div className={cx('search-result')}>검색결과 {searchPostCount}</div>
		) : (current === 'links' ? (
			<div className={cx('search-result')}>링크 {linkCount}</div>
		) : ([
			<Link to="/" key="intro" className={cx('intro', current === '' && 'current')}>
				블로그 소개
			</Link>,
			<Link to="/list" key="list" className={cx('list', current.includes('list') && 'current')}>
				글 {postCount}
			</Link>,
			<Link to="/series" key="series" className={cx('series', current.includes('series') && 'current')}>
				시리즈 {seriesCount}
			</Link>
		]))}
	</Wrapper>
);

Navigation.propTypes = {
	current: PropTypes.string
};

Navigation.defaultProps = {
	current: 'intro'
};

export default Navigation;
