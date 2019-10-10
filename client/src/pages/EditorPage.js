import React from 'react';
import EditorTemplate from 'components/editor/EditorTemplate';
import EditorToolbarContainer from 'containers/editor/EditorToolbarContainer';
import EditorPaneContainer from 'containers/editor/EditorPaneContainer';
import PreviewPaneContainer from 'containers/editor/PreviewPaneContainer';

const EditorPage = () => (
    <EditorTemplate
        toolbar={<EditorToolbarContainer />}
        editor={<EditorPaneContainer />}
        preview={<PreviewPaneContainer />} />
)

export default EditorPage;