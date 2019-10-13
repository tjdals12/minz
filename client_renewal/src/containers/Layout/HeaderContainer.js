import React, { useEffect } from 'react';
import Header from 'components/Layout/Header';
import { useSelector, useDispatch } from 'react-redux';
import { getBlog } from 'store/modules/blog';

const HeaderContainer = () => {
	const background = useSelector((state) => state.blog.getIn([ 'info', 'background' ]), []);
	const thumbnail = useSelector((state) => state.blog.getIn([ 'info', 'thumbnail' ]), []);
	const title = useSelector((state) => state.blog.getIn([ 'info', 'title' ]), []);

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(getBlog());
		},
		[ dispatch ]
	);

	return <Header background={background} thumbnail={thumbnail} title={title} />;
};

export default HeaderContainer;
