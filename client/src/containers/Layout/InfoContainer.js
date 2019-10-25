import React from 'react';
import Info from 'components/Layout/Info';
import { useSelector } from 'react-redux';

const InfoContainer = () => {
	const name = useSelector((state) => state.blog.getIn([ 'info', 'name' ]), []);
	const description = useSelector((state) => state.blog.getIn([ 'info', 'description' ]), []);
	const todayPostCount = useSelector((state) => state.blog.getIn([ 'info', 'todayPostCount' ]), []);
	const postCount = useSelector((state) => state.blog.getIn([ 'info', 'postCount' ]), []);

	return <Info name={name} description={description} todayPostCount={todayPostCount} postCount={postCount} />;
};

export default InfoContainer;
