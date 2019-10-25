import React from 'react';
import classNames from 'classnames';
import styles from './PostInfo.scss';
import { Count, Wrapper, Tag, Content, ButtonWrapper, Button } from 'components/common';
import { FaHeart, FaComment, FaEye } from 'react-icons/fa';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const likeStyle = {
	color: '#e64980',
	fontSize: '1.25rem'
};

const commentStyle = {
	color: '#228be6',
	fontSize: '1rem'
};

const hitStyle = {
	fontSize: '1rem'
};

const PostInfo = ({ user, id, title, writer, tags, hit, like, commentCount, publishedDate, onOpen }) => (
	<Wrapper className={cx('post-info-wrapper')}>
		{tags.map((tag, index) => (
			<Tag key={index} to={`/search?keyword${tag}`}>
				{tag}
			</Tag>
		))}

		<Content title={title} description={publishedDate} type="post-info" />
		<p className={cx('post-writer')}>
			write by. <b>{writer}</b>
		</p>

		<div className={cx('post-info-bottom')}>
			<Count count={like} post-like>
				<FaHeart style={likeStyle} />
			</Count>
			<Count count={commentCount} post-comment>
				<FaComment style={commentStyle} />
			</Count>
			<Count count={hit} post-hit>
				<FaEye style={hitStyle} />
			</Count>

			{user === writer && (
				<ButtonWrapper>
					<Button key="modify" to={`/editor?postId=${id}`} theme="green">
						수정
					</Button>
					<Button key="remove" onClick={() => onOpen('askRemove')}>
						삭제
					</Button>
				</ButtonWrapper>
			)}
		</div>
	</Wrapper>
);

PostInfo.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	writer: PropTypes.string,
	tags: PropTypes.array,
	hit: PropTypes.number,
	like: PropTypes.number,
	commentCount: PropTypes.number,
	publishedDate: PropTypes.string
};

PostInfo.defaultProps = {
	title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	writer: 'minz',
	tags: [ 'Javascript', 'Mongo' ],
	hit: 0,
	like: 0,
	commentCount: 0,
	publishedDate: 'Saturday, April 6, 2019 9:57 PM'
};

export default PostInfo;
