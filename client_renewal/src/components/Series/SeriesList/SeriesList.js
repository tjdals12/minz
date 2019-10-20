import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './SeriesList.scss';
import { Wrapper, Thumbnail, Content, Tag } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const SeriesItem = ({ seq, thumbnail, name, description, keyword, writer, post, finishGb }) => {
	return (
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
};

const SeriesList = ({ series }) => {
	const seriesList = series.map((item, index) => {
		const { seq, thumbnail, name, description, keyword, writer, post, finishGb } = item;

		return (
			<SeriesItem
				key={index}
				seq={seq}
				thumbnail={thumbnail}
				name={name}
				description={description}
				keyword={keyword}
				writer={writer}
				post={post.length}
				finishGb={finishGb}
			/>
		);
	});

	return <Wrapper className={cx('series-list')}>{seriesList}</Wrapper>;
};

SeriesList.propTypes = {
	series: PropTypes.arrayOf(
		PropTypes.shape({
			seq: PropTypes.number,
			thumbnail: PropTypes.string,
			name: PropTypes.string,
			description: PropTypes.string,
			writer: PropTypes.string,
			post: PropTypes.array,
			finishGb: PropTypes.string
		})
	)
};

SeriesList.defaultProps = {
	series: []
};

export default SeriesList;
