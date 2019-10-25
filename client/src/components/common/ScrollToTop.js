import React, { useEffect } from 'react';

const ScrollToTop = ({ children }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return <div>{children}</div>;
};

export default ScrollToTop;
