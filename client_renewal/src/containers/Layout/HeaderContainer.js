import React, { useEffect } from 'react';
import Header from 'components/Layout/Header';
import { useSelector, useDispatch } from 'react-redux';
import { getBlog } from 'store/modules/blog';

const HeaderContainer = () => {
	const info = useSelector((state) => state.blog.get('info').toJS(), []);
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(getBlog());
		},
		[ dispatch ]
	);

	return <Header {...info} />;
};

export default HeaderContainer;
