import React from 'react';
import classNames from 'classnames';
import styles from './PostList.scss';
import { Wrapper } from 'components/common';
import PostItem from './PostItem';
import removeMd from 'remove-markdown';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const PostList = ({ posts }) => (
	<Wrapper className={cx('post-list')}>
		{posts.map(({ _id, title, body, hit, comments, publishedDate }, index) => (
			<PostItem
				key={index}
				id={_id}
				title={title}
				body={removeMd(body)}
				hit={hit}
				comments={comments}
				publishedDate={publishedDate}
			/>
		))}
	</Wrapper>
);

PostList.propTypes = {
	posts: PropTypes.array
};

PostList.defaultProps = {
	posts: []
};

export default PostList;
