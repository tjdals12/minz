import React from 'react';
import classNames from 'classnames';
import styles from './SeriesPosts.scss';
import PostList from 'components/PostList';
import { Wrapper, ButtonWrapper, Button } from 'components/common';

const cx = classNames.bind(styles);

const SeriesPosts = ({ seq, writer, posts, username }) => (
	<Wrapper className={cx('series-posts')}>
		{posts.length === 0 && (
			<div className={cx('empty-box')}>
				<div className={cx('empty-box')}>
					<h1 className={cx('title')}>"현재 작성된 포스트가 없습니다."</h1>
					{username === writer && (
						<Button to={`/editor?series=${seq}`} theme="white">
							첫 포스트 작성
						</Button>
					)}
				</div>
			</div>
		)}

		{posts.length > 0 &&
		username === writer && (
			<ButtonWrapper>
				<Button to={`/editor?series=${seq}`} theme="green">
					이 시리즈에 포스트 추가
				</Button>
			</ButtonWrapper>
		)}
		<PostList posts={posts} />
	</Wrapper>
);

export default SeriesPosts;
