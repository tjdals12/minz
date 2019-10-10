import React, { Component } from 'react';
import EditorPane from 'components/editor/EditorPane';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editorActions from 'store/modules/editor';

class EditorPaneContainer extends Component{
    componentDidMount(){
        const { EditorActions } = this.props;
        EditorActions.initialize();
    }

    handleChangeInput = ({name, value}) => {
        const { EditorActions } = this.props;
        EditorActions.changeInput({name, value});
    }

    render(){
        const { handleChangeInput } = this;
        const { title, markdown, tags } = this.props;

        return(
            <EditorPane
                title={title}
                markdown={markdown}
                tags={tags}
                onChange={handleChangeInput} />
        )
    }
}

export default connect(
    (state) => ({
        title : state.editor.get('title'),
        markdown : state.editor.get('markdown'),
        tags : state.editor.get('tags')
    }),
    (dispatch) => ({
        EditorActions : bindActionCreators(editorActions, dispatch)
    })
)(EditorPaneContainer);