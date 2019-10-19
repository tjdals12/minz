import React from 'react';
import { withRouter } from 'react-router-dom';
import EditorToolbar from 'components/Editor/EditorToolbar';
import { useSelector, useDispatch } from 'react-redux';
import { onChange } from 'store/modules/editor';
import { writePost } from 'store/modules/post';
import axios from 'axios';

const EditorToolbarContainer = ({ history }) => {
	const title = useSelector((state) => state.editor.get('title'), []);
	const markdown = useSelector((state) => state.editor.get('markdown'), []);
	const tags = useSelector((state) => state.editor.get('tags'), []);
	const dispatch = useDispatch();

	const handleGoBack = () => {
		history.goBack();
	};

	const handleSubmit = async () => {
		await dispatch(writePost({ title, body: markdown, tags: tags ? tags.split(',') : [] })).then((response) => {
			history.push(`/post/${response.data.data._id}`);
		});
	};

	const handleUpload = async (file) => {
		var formData = new FormData();
		formData.append('imgUploader', file);

		await axios({
			method: 'POST',
			url: '/api/upload',
			data: formData,
			config: { headers: { 'Content-Type': 'multipart/form-data' } }
		}).then((response) => {
			dispatch(
				onChange({
					name: 'markdown',
					value: markdown + '\n![](' + response.data + ')\n'
				})
			);
		});
	};

	return <EditorToolbar onGoBack={handleGoBack} onSubmit={handleSubmit} onUpload={handleUpload} />;
};

export default withRouter(EditorToolbarContainer);
