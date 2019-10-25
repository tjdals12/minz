import React from 'react';
import SeriesPosts from 'components/Series/SeriesPosts';
import { useSelector } from 'react-redux';

const SeriesPostsContainer = () => {
	const { seq, writer } = useSelector((state) => state.series.get('series').toJS(), []);
	const posts = useSelector((state) => state.series.get('posts').toJS(), []);
	const username = useSelector((state) => state.auth.getIn([ 'userInfo', 'profile', 'username' ]));

	return <SeriesPosts seq={seq} writer={writer} posts={posts} username={username} />;
};

export default SeriesPostsContainer;
