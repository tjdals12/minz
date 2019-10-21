import React, { useCallback } from 'react';
import SeriesToolbar from 'components/SeriesList/SeriesToolbar';
import { useDispatch } from 'react-redux';
import { open } from 'store/modules/modal';

const SeriesToolbarContainer = () => {
	const dispatch = useDispatch();

	const handleOpen = useCallback(
		(name) => {
			dispatch(open(name));
		},
		[ dispatch ]
	);

	return <SeriesToolbar onOpen={handleOpen} />;
};

export default SeriesToolbarContainer;
