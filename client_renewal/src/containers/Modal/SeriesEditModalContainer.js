import React, { useCallback } from 'react';
import SeriesEditModal from 'components/Modal/SeriesEditModal';
import { useSelector, useDispatch } from 'react-redux';
import { close } from 'store/modules/modal';
import { updateSeries, onChange } from 'store/modules/series';

const SeriesEditModalContainer = () => {
	const isOpen = useSelector((state) => state.modal.get('seriesEdit'), []);
	const seq = useSelector((state) => state.series.getIn([ 'series', 'seq' ]));
	const { thumbnail, name, description, keyword, writer } = useSelector(
		(state) => state.series.get('edit').toJS(),
		[]
	);
	const dispatch = useDispatch();

	const handleClose = useCallback(
		(name) => {
			dispatch(close(name));
		},
		[ dispatch ]
	);

	const handleChange = useCallback(
		(e) => {
			const { name, value } = e.target;

			dispatch(onChange({ target: 'edit', name, value }));
		},
		[ dispatch ]
	);

	const handleEdit = useCallback(
		() => {
			dispatch(
				updateSeries(seq, { thumbnail, name, description, keyword: keyword ? keyword.trim().split(',') : [] })
			);
			dispatch(close('seriesEdit'));
		},
		[ seq, thumbnail, name, description, keyword, dispatch ]
	);

	return (
		<SeriesEditModal
			visible={isOpen}
			thumbnail={thumbnail}
			name={name}
			description={description}
			keyword={keyword}
			writer={writer}
			onChange={handleChange}
			onClose={handleClose}
			onEdit={handleEdit}
		/>
	);
};

export default SeriesEditModalContainer;
