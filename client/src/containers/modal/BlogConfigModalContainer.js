import React, { Component } from 'react';
import BlogConfigModal from 'components/modal/BlogConfigModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as modalActions from 'store/modules/modal';
import * as blogActions from 'store/modules/blog';

class BlogConfigModalContainer extends Component{
    handleHideModal = () => {
        const { ModalActions } = this.props;
        ModalActions.hideModal({
            modal: 'blog'
        })
    }

    handleChangeInput = ({name, value}) => {
        const { BlogActions } = this.props;
        BlogActions.changeInput({name, value});
    }

    handleUpload = async (name, file) => {
        const { BlogActions } = this.props;

        var formData = new FormData();
        formData.append("imgUploader", file);

        await axios({
            method: "POST",
            url: "/upload",
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then((response) => {
            BlogActions.changeInput({
                name : name,
                value : response.data
            })
        });
    }

    /**
     * TODO:
     * 1. 누락된 입력값이 있을 경우, 알림창 띄움 또는 서버에서 없는 값은 업데이트 하지 않고 기존값 그대로 사용
     * 2. textarea에 줄바꿈 적용하는 방법, 현재까지 확안된 걸론 줄바꿈 텍스트가 아예 들어가지 않음.
     */
    handleEdit = async () => {
        const { ModalActions, BlogActions, editInput } = this.props;

        const {
            background,
            thumbnail,
            title,
            name,
            description,
            info,
            tags
        } = editInput.toJS();

        const blog = {
            background,
            thumbnail,
            title,
            name,
            description,
            info: info === "" ? "" : info,
            tags: tags === "" ? [] : tags === null ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
        }

        try{
            await BlogActions.editBlogInfo({...blog})
            .then(() => {
                ModalActions.hideModal({
                    modal: 'blog'
                })

                BlogActions.getBlogInfo();
            })
            .catch((e) => {
                console.log(e)
            });
        }catch(e){
            console.error(e);
        }
    }

    render(){
        const { visible } = this.props;
        const { handleHideModal, handleChangeInput, handleUpload, handleEdit } = this;

        return(
            <BlogConfigModal
                visible={visible}
                onHideModal={handleHideModal}
                onChangeInput={handleChangeInput}
                onUpload={handleUpload}
                onEdit={handleEdit} />
        )
    }
}

export default connect(
    (state) => ({
        visible : state.modal.getIn(['modal', 'blog']),
        editInput : state.blog.get('editInput')
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch),
        BlogActions : bindActionCreators(blogActions, dispatch)
    })
)(BlogConfigModalContainer);