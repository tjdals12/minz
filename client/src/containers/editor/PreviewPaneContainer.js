import React from 'react';
import PreviewPane from 'components/editor/PreviewPane';
import { useSelector } from 'react-redux';

const PreviewPaneContainer = () => {
	const title = useSelector((state) => state.editor.get('title'), []);
	const markdown = useSelector((state) => state.editor.get('markdown'), []);

	return <PreviewPane title={title} markdown={markdown} />;
};

export default PreviewPaneContainer;
