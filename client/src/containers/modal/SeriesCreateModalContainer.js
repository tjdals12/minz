import React, { useReducer, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import SeriesCreateModal from 'components/modal/SeriesCreateModal';
import { useSelector, useDispatch } from 'react-redux';
import { close } from 'store/modules/modal';
import { createSeries } from 'store/modules/series';
import DefaultThumbnail from 'assets/img/series_thumbnail.jpg';
import axios from 'axios';

const reducer = (state, action) => {
	return {
		...state,
		[action.name]: action.value
	};
};

const SeriesCreateModalContainer = ({ history }) => {
	const [ state, dispatch ] = useReducer(reducer, {
		thumbnail: DefaultThumbnail,
		name: '',
		description: '',
		keyword: ''
	});
	const { thumbnail, name, description, keyword } = state;
	const isOpen = useSelector((state) => state.modal.get('seriesCreate'), []);
	const rDispatch = useDispatch();

	const handleUpload = async (file) => {
		if (!file) {
			dispatch({
				name: 'thumbnail',
				value: DefaultThumbnail
			});
			return;
		}

		const fileType = file.name.split('.').pop();
		if (![ 'jpg', 'png' ].includes(fileType)) return;

		let formData = new FormData();
		formData.append('imgUploader', file);

		await axios({
			method: 'POST',
			url: '/api/upload',
			data: formData,
			config: { headers: { 'Content-Type': 'multipart/form-data' } }
		}).then((response) => {
			dispatch({
				name: 'thumbnail',
				value: response.data
			});
		});
	};

	const handleChange = useCallback(
		(e) => {
			dispatch(e.target);
		},
		[ dispatch ]
	);

	const handleClose = useCallback(
		(name) => {
			rDispatch(close(name));
		},
		[ rDispatch ]
	);

	const handleSubmit = useCallback(
		() => {
			rDispatch(
				createSeries({ thumbnail, name, description, keyword: keyword ? keyword.split(',') : [] })
			).then((response) => {
				handleClose('seriesCreate');
				history.push(`/series/${response.data.data.seq}`);
			});
		},
		[ rDispatch, thumbnail, name, description, keyword, handleClose, history ]
	);

	return (
		<SeriesCreateModal
			visible={isOpen}
			thumbnail={thumbnail}
			name={name}
			description={description}
			keyword={keyword}
			onUpload={handleUpload}
			onChange={handleChange}
			onClose={handleClose}
			onSubmit={handleSubmit}
		/>
	);
};

export default withRouter(SeriesCreateModalContainer);
