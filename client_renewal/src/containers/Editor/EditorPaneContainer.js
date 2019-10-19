import React, { useEffect } from 'react';
import { EditorPane } from 'components/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { onChange, initialize } from 'store/modules/editor';

const EditorPaneContainer = () => {
	const title = useSelector((state) => state.editor.get('title'), []);
	const markdown = useSelector((state) => state.editor.get('markdown'), []);
	const tags = useSelector((state) => state.editor.get('tags'), []);
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(initialize());
		},
		[ dispatch ]
	);

	const handleChange = ({ name, value }) => {
		dispatch(onChange({ name, value }));
	};

	return <EditorPane title={title} markdown={markdown} tags={tags} onChange={handleChange} />;
};

export default EditorPaneContainer;
