import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import EditorTemplate from 'components/Editor/EditorTemplate';
import EditorToolbarContainer from 'containers/Editor/EditorToolbarContainer';
import EditorPaneContainer from 'containers/Editor/EditorPaneContainer';
import PreviewPaneContainer from 'containers/Editor/PreviewPaneContainer';

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
