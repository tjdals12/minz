import React from 'react';
import classNames from 'classnames';
import styles from './Introduction.scss';
import { Wrapper, Content, Tag } from 'components/common';
import MySites from './MySites';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Introduction = ({ info, tags }) => (
	<Wrapper className={cx('introduction')}>
		<Content title="소개" description={info} type="introduction" />
		{tags &&
			tags.map((tag) => (
				<Tag key={tag} to={`/search?keyword=${tag}`}>
					{tag}
				</Tag>
			))}
		<MySites />
	</Wrapper>
);

Introduction.propTypes = {
	info: PropTypes.string,
	tags: PropTypes.array
};

Introduction.defaultProps = {
	info: 'Blog intro..',
	tags: [ 'Javascript', 'React' ]
};

export default Introduction;
