import React from 'react';
import Info from 'components/Layout/Info';
import { useSelector } from 'react-redux';

const InfoContainer = () => {
	const info = useSelector((state) => state.blog.get('info').toJS(), []);

	return <Info {...info} />;
};

export default InfoContainer;
