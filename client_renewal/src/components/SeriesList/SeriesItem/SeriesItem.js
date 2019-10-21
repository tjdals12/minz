import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './SeriesItem.scss';
import { Thumbnail, Content, Tag } from 'components/common';

const cx = classNames.bind(styles);

const SeriesItem = ({ seq, thumbnail, name, description, keyword, writer, post, finishGb }) => (
	<div className={cx('series-item')}>
		<Thumbnail url={thumbnail} type="series" />

		<div className={cx('description')}>
			<Link to={`/series/${seq}`}>
				<Content title={name} description={description} type="series" />
			</Link>

			{keyword.map((item) => (
				<Tag key={item} to={`/series/${seq}`}>
					{item}
				</Tag>
			))}

			<div className={cx('author')}>
				<p className={cx('author-name')}>writer. {writer}</p>
				<div className={cx('series-count')}>
					<span>글 {post}</span>
					<span>{finishGb}</span>
				</div>
			</div>
		</div>
	</div>
);

export default SeriesItem;
