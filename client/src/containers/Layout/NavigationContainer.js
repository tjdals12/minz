import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Navigation from 'components/Layout/Navigation';
import { useSelector } from 'react-redux';

const NavigationContainer = ({ location }) => {
	const searchPostCount = useSelector((state) => state.post.get('postCount'));
	const postCount = useSelector((state) => state.blog.getIn([ 'info', 'postCount' ]));
	const seriesCount = useSelector((state) => state.blog.getIn([ 'info', 'seriesCount' ]));
	const linkCount = useSelector((state) => state.link.get('linkCount'));
	const [ current, setCurrent ] = useState('');

	useEffect(
		() => {
			const { pathname } = location;
			setCurrent(pathname.replace('/', ''));
		},
		[ location, setCurrent ]
	);

	return (
		<Navigation
			searchPostCount={searchPostCount}
			postCount={postCount}
			seriesCount={seriesCount}
			linkCount={linkCount}
			current={current}
		/>
	);
};

export default withRouter(NavigationContainer);
