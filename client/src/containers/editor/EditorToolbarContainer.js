import React, { Component } from 'react';
import EditorToolbar from 'components/editor/EditorToolbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as editorActions from 'store/modules/editor';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

class EditorToolbarContainer extends Component{

    componentDidMount(){
        const { EditorActions, location } = this.props;

        const { postId } = queryString.parse(location.search);

        try{
            if(postId){
                EditorActions.getPost(postId);
            }
        }catch(e){
            console.error(e);
        }
    }

    handleSubmit = async () => {
        const { title, markdown, tags, EditorActions, history, location } = this.props;

        const post = {
            title,
            body : markdown,
            tags : tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
        }

        try{

            const { postId } = queryString.parse(location.search);

            if(postId){
                await EditorActions.editPost({postId, ...post});
                history.push(`/post/${postId}`);
                return;
            }

            const { series } = queryString.parse(location.search);

            if(series){
                await EditorActions.seriesPost({series, ...post});
                history.push(`/post/${this.props.postId}`);
                return;
            }

            await EditorActions.writePost(post);
            history.push(`/post/${this.props.postId}`);
        }catch(e){
            console.error(e);
        }
    }

    handleUpload = async (file) => {
        const { EditorActions, markdown } = this.props;

        var formData = new FormData();
        formData.append("imgUploader", file);

        await axios({
            method: "POST",
            url: "/upload",
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then((response) => {
            EditorActions.changeInput({
                name : "markdown",
                value : markdown + "\n![](" + response.data + ")\n"
            })
        });
    }

    handleGoBack = () => {
        const { history } = this.props;
        history.goBack();
    }

    render(){
        const { handleGoBack, handleSubmit, handleUpload } = this;
        const { postId } = queryString.parse(this.props.location.search);

        return(
            <EditorToolbar
                onGoBack={handleGoBack}
                onSubmit={handleSubmit}
                onUpload={handleUpload}
                isEdit={postId ? true : false} />
        )
    }
}

export default connect(
    (state) => ({
        title : state.editor.get('title'),
        markdown : state.editor.get('markdown'),
        tags : state.editor.get('tags'),
        postId : state.editor.get('postId')
    }),
    (dispatch) => ({
        EditorActions : bindActionCreators(editorActions, dispatch)
    })
)(withRouter(EditorToolbarContainer));
