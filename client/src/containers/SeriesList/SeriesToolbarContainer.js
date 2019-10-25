import React, { useCallback } from 'react';
import SeriesToolbar from 'components/SeriesList/SeriesToolbar';
import { useSelector, useDispatch } from 'react-redux';
import { open } from 'store/modules/modal';

const SeriesToolbarContainer = () => {
	const isLogin = useSelector((state) => state.auth.get('isLogin'), []);
	const dispatch = useDispatch();

	const handleOpen = useCallback(
		(name) => {
			dispatch(open(name));
		},
		[ dispatch ]
	);

	return <SeriesToolbar isLogin={isLogin} onOpen={handleOpen} />;
};

export default SeriesToolbarContainer;
