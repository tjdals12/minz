import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Pagination from 'components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getTags, searchPosts } from 'store/modules/post';
import { getSeriesList, getKeywords } from 'store/modules/series';
import { getLinks, getLinkCount } from 'store/modules/link';
import queryString from 'query-string';

const PaginationContainer = ({ type, history, location }) => {
	const [ currentPage, setCurrentPage ] = useState(1);
	const dispatch = useDispatch();
	const lastPage = useSelector(
		(state) => ([ 'post', 'search' ].includes(type) 
			? state.post.get('lastPage')
			: (type === 'link'
				? state.link.get('lastPage')
				: state.series.get('lastPage'))
			)
	);

	const handlePage = useCallback(
		(page) => {
			const { pathname } = location;
			const { keyword } = queryString.parse(location.search);

			history.push(`${pathname}?${type === 'search' ? 'keyword=' + keyword + '&' : ''}page=${page}`);
		},
		[ type, location, history ]
	);

	useEffect(
		() => {
			let { page, keyword } = queryString.parse(location.search);
			page = parseInt(page || 1, 10);
			setCurrentPage(page);

			switch(type) {
				case 'post':
					dispatch(getPosts(page));
					dispatch(getTags());
					dispatch(getLinks(1));
					break;
				case 'series':
					dispatch(getSeriesList(page));
					dispatch(getKeywords());
					dispatch(getLinks(1));
					break;
				case 'link':
					dispatch(getLinks(page));
					dispatch(getLinkCount());
					break;
				default:
					dispatch(searchPosts(page, { keyword }))

			}
		},
		[ location, type, dispatch ]
	);

	return <Pagination page={currentPage} lastPage={lastPage} onPage={handlePage} />;
};

export default withRouter(PaginationContainer);
