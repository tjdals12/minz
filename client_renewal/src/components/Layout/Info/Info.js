import React from 'react';
import classNames from 'classnames';
import styles from './Info.scss';
import { Wrapper, Content, Count, Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Info = ({ name, description, todayPostCount, postCount }) => (
	<Wrapper className={cx('info-wrapper')}>
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
	</Wrapper>
);

Info.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	todayPostCount: PropTypes.number,
	postCount: PropTypes.number
};

Info.defaultProps = {
	name: '이성민',
	description: '풀스택 개발자',
	todayPostCount: 0,
	postCount: 0
};

export default Info;
