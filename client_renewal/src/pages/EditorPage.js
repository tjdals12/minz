import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import { EditorTemplate, EditorToolbar, EditorPane, PreviewPane } from 'components/Editor';

const EditorPage = () => {
	return (
		<ScrollToTop>
			<EditorTemplate toolbar={<EditorToolbar />} editor={<EditorPane />} preview={<PreviewPane />} />
		</ScrollToTop>
	);
};

export default EditorPage;
