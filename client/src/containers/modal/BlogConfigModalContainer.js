import React, { useCallback } from 'react';
import BlogConfigModal from 'components/modal/BlogConfigModal';
import { useSelector, useDispatch } from 'react-redux';
import { close } from 'store/modules/modal';
import { editBlog, onChange } from 'store/modules/blog';
import axios from 'axios';

const BlogConfigModalContainer = () => {
	const isOpen = useSelector((state) => state.modal.get('blogConfig'), []);
	const info = useSelector((state) => state.blog.get('edit'), []);
	const dispatch = useDispatch();

	const handleUpload = useCallback(
		async (name, file) => {
			if (!file) {
				dispatch(
					onChange({
						target: 'edit',
						name,
						value: ''
					})
				);

				return;
			}

			let formData = new FormData();
			formData.append('imgUploader', file);

			await axios({
				method: 'POST',
				url: '/api/upload',
				data: formData,
				config: { headers: { 'Content-Type': 'multipart/form-data' } }
			}).then((response) => {
				dispatch(
					onChange({
						target: 'edit',
						name,
						value: response.data
					})
				);
			});
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

	const handleClose = useCallback(
		(name) => {
			dispatch(close(name));
		},
		[ dispatch ]
	);

	const handleSubmit = useCallback(
		() => {
			let param = info.toJS();

			dispatch(
				editBlog({
					...param,
					tags: param.tags.split(',')
				})
			).then(() => {
				dispatch(close('blogConfig'));
			});
		},
		[ info, dispatch ]
	);

	return (
		<BlogConfigModal
			info={info.toJS()}
			visible={isOpen}
			onUpload={handleUpload}
			onChange={handleChange}
			onSubmit={handleSubmit}
			onClose={handleClose}
		/>
	);
};

export default BlogConfigModalContainer;
