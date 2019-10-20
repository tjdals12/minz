import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Pagination from 'components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from 'store/modules/post';
import queryString from 'query-string';

const PaginationContainer = ({ type, history, location }) => {
	const [ currentPage, setCurrentPage ] = useState(1);
	const dispatch = useDispatch();
	const lastPage = useSelector((state) => (type === 'post' ? state.post.get('lastPage') : 1));

	const handlePage = useCallback(
		(page) => {
			const { pathname } = location;
			history.push(`${pathname}?page=${page}`);
		},
		[ location, history ]
	);

	useEffect(
		() => {
			const { page } = queryString.parse(location.search);
			setCurrentPage(parseInt(page || 1, 10));
			dispatch(getPosts(currentPage));
		},
		[ currentPage, location, dispatch ]
	);

	return <Pagination page={currentPage} lastPage={lastPage} onPage={handlePage} />;
};

export default withRouter(PaginationContainer);
