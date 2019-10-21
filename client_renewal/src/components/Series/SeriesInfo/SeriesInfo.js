import React from 'react';
import classNames from 'classnames';
import styles from './SeriesInfo.scss';
import { Wrapper, ButtonWrapper, Button, Content, Tag } from 'components/common';
import { FaAsterisk } from 'react-icons/fa';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const SeriesInfo = ({ username, writer, name, description, post, finishGb, dispGb, keyword, publishedDate }) => (
	<Wrapper className={cx('series-info')}>
		{username === writer && (
			<ButtonWrapper>
				<Button theme="small">공개</Button>
				<Button theme="small">수정</Button>
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
	publishedDate: PropTypes.string
};

SeriesInfo.defaultProps = {
	name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	description:
		'Nam vitae sapien id velit molestie accumsan ut a metus. Curabitur dapibus ipsum sed lacus facilisis, in cursus dui hendrerit. Aenean vel iaculis quam, et sollicitudin augue. In hac habitasse platea dictumst. Curabitur pellentesque justo quis neque venenatis viverra. Vivamus sodales leo vitae interdum consectetur.',
	post: [ { title: '1' }, { title: '2' }, { title: '3' } ],
	finishGb: '연재중',
	dispGb: '공개',
	keyword: [ 'Docker', 'Container', 'Deploy' ],
	publishedDate: '2019-10-23  09:57:14'
};

export default SeriesInfo;
