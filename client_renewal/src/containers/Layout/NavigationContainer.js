import React, { useState } from 'react';
import Navigation from 'components/Layout/Navigation';
import { useSelector } from 'react-redux';

const NavigationContainer = () => {
	const postCount = useSelector((state) => state.blog.getIn([ 'info', 'postCount' ]));
	const seriesCount = useSelector((state) => state.blog.getIn([ 'info', 'seriesCount' ]));
	const [ current, setCurrent ] = useState('intro');

	return <Navigation postCount={postCount} seriesCount={seriesCount} current={current} setCurrent={setCurrent} />;
};

export default NavigationContainer;
