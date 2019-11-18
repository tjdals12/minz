import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import EditorTemplate from 'components/editor/EditorTemplate';
import EditorToolbarContainer from 'containers/editor/EditorToolbarContainer';
import EditorPaneContainer from 'containers/editor/EditorPaneContainer';
import PreviewPaneContainer from 'containers/editor/PreviewPaneContainer';

const EditorPage = () => {
	return (
		<ScrollToTop>
			<EditorTemplate
				toolbar={<EditorToolbarContainer />}
				editor={<EditorPaneContainer />}
				preview={<PreviewPaneContainer />}
			/>
		</ScrollToTop>
	);
};

export default EditorPage;
