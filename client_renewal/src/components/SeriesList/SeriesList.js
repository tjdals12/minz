import React from 'react';
import classNames from 'classnames';
import styles from './SeriesList.scss';
import { Wrapper } from 'components/common';
import SeriesItem from './SeriesItem';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

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
