import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Info.scss';
import { Content, Count, Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Info = ({ name, description, todayPostCount, postCount, seriesCount, current }) => (
	<div className={cx('info-wrapper')}>
		<Content title={name} description={description} type="user" />

		<div className={cx('blog-info')}>
			<Count count={todayPostCount} today-post>
				오늘의 글
			</Count>
			<Count count={postCount} all-post>
				지금까지의 글
			</Count>

			<div className={cx('button-wrapper')}>
				<Button to="/">제안하기</Button>
				<Button to="/" theme="green">
					구독하기
				</Button>
			</div>
		</div>

		<div className={cx('menu')}>
			{current === 'search' ? (
				<div className={cx('search-result')}>검색결과</div>
			) : (
				[
					<Link to="/" key="intro" className={cx('intro', current === 'intro' && 'current')}>
						블로그 소개
					</Link>,
					<Link to="/list" key="list" className={cx('list', current === 'list' && 'current')}>
						글 {postCount}
					</Link>,
					<Link to="/series" key="series" className={cx('series', current === 'series' && 'current')}>
						시리즈 {seriesCount}
					</Link>
				]
			)}
		</div>
	</div>
);

Info.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	todayPostCount: PropTypes.number,
	postCount: PropTypes.number,
	seriesCount: PropTypes.number,
	current: PropTypes.string
};

Info.defaultProps = {
	name: '이성민',
	description: '풀스택 개발자',
	todayPostCount: 0,
	postCount: 0,
	seriesCount: 0,
	current: 'intro'
};

export default Info;
