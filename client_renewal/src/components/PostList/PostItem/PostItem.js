import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './PostItem.scss';
import { MdAccessTime } from 'react-icons/md';
import { Content, Count } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const PostItem = ({ id, title, body, hit, comments, publishedDate }) => (
	<div className={cx('post-item')}>
		<Link to={`/post/${id}`}>
			<Content title={title} description={body} type="post" />

			<div className={cx('post-count')}>
				<Count count={hit} share direction="horizontal">
					조회
				</Count>
				<Count count={comments} comment direction="horizontal">
					댓글
				</Count>

				<MdAccessTime className={cx('date-icon')} />
				<span className={cx('date')}>{publishedDate.substr(0, 10)}</span>
			</div>
		</Link>
	</div>
);

PostItem.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	body: PropTypes.string,
	hit: PropTypes.number,
	comments: PropTypes.number,
	publishedDate: PropTypes.string
};

PostItem.defaultProps = {
	title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	body:
		'Duis lacinia neque ac orci sollicitudin, a porta diam consequat. Suspendisse hendrerit sem iaculis dui imperdiet volutpat. Quisque euismod risus urna. Nulla facilisi. Pellentesque ',
	hit: 0,
	comments: 0,
	publishedDate: '2019-01-01'
};

export default PostItem;
