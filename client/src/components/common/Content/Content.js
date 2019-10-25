import React from 'react';
import styles from './Content.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Content = ({ title, description, type }) => (
	<div className={cx('content', type)}>
		<h1 className={cx('title')}>{title}</h1>
		{description && type === 'introduction' ? (
			description.split('\n').map((value, index) => {
				return <p key={index}>{value}</p>;
			})
		) : (
			<p>{description}</p>
		)}
	</div>
);

export default Content;
