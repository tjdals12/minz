import React from 'react';
import classNames from 'classnames';
import styles from './SeriesInfo.scss';
import { Wrapper, ButtonWrapper, Button, Content, Tag } from 'components/common';
import { FaAsterisk } from 'react-icons/fa';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const SeriesInfo = ({
	username,
	writer,
	name,
	description,
	post,
	finishGb,
	dispGb,
	keyword,
	publishedDate,
	onToggle,
	onOpen
}) => (
	<Wrapper className={cx('series-info')}>
		{username === writer && (
			<ButtonWrapper>
				<Button theme="small" onClick={onToggle}>
					{dispGb === '01' ? '비공개' : '공개'}
				</Button>
				<Button theme="small" onClick={() => onOpen('seriesEdit')}>수정</Button>
			</ButtonWrapper>
		)}

		<Content title={name} description={description} type="series-info" />

		{keyword.map((item, index) => (
			<Tag key={index} to={`/search/${item}`}>
				{item}
			</Tag>
		))}

		<ul className={cx('series-summary')}>
			<li>
				<FaAsterisk size={10} />글 {post.length}
			</li>
			<li>
				<FaAsterisk size={10} />
				{finishGb}
			</li>
			<li>
				<FaAsterisk size={10} />
				{dispGb === '01' ? '공개' : '비공개'}
			</li>
			<li className={cx('date')}>{publishedDate.substr(0, 10)}</li>
		</ul>
	</Wrapper>
);

SeriesInfo.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	post: PropTypes.array,
	finishGb: PropTypes.string,
	dispGb: PropTypes.string,
	keyword: PropTypes.array,
	publishedDate: PropTypes.string,
	onToggle: PropTypes.func,
	onOpen: PropTypes.func
};

SeriesInfo.defaultProps = {
	post: [],
	keyword: [],
	publishedDate: '2019-10-23',
	onToggle: () => console.warn('Warning: onToggle is not defined'),
	onOpen: () => console.warn('Warning: onOpen is not defined')
};

export default SeriesInfo;
