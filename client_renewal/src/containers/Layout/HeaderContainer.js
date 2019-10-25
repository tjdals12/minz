import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Header from 'components/Layout/Header';
import { useSelector, useDispatch } from 'react-redux';
import { getBlog } from 'store/modules/blog';
import { searchPosts } from 'store/modules/post';

const HeaderContainer = ({ history }) => {
	const background = useSelector((state) => state.blog.getIn([ 'info', 'background' ]), []);
	const thumbnail = useSelector((state) => state.blog.getIn([ 'info', 'thumbnail' ]), []);
	const title = useSelector((state) => state.blog.getIn([ 'info', 'title' ]), []);

	const dispatch = useDispatch();

	const handleSearch = async (keyword) => {
		await dispatch(searchPosts(1, { keyword }));
		history.push(`/search?keyword=${keyword}&page=1`);
	};

	useEffect(
		() => {
			dispatch(getBlog());
		},
		[ dispatch ]
	);

	return <Header background={background} thumbnail={thumbnail} title={title} onSearch={handleSearch} />;
};

export default withRouter(HeaderContainer);
