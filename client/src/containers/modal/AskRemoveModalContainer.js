import React, { Component } from 'react';
import AskRemoveModal from 'components/modal/AskRemoveModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as commentActions from 'store/modules/comment';
import { withRouter } from 'react-router-dom';

class AskRemoveModalContainer extends Component{
    handleHideModal = () => {
        const { ModalActions } = this.props;
        ModalActions.hideModal({
            modal : 'remove'
        });
    }

    handlePostRemove = async () => {
        const { ModalActions, id, history } = this.props;

        try{
            await ModalActions.deletePost(id);
            ModalActions.hideModal({
                modal : 'remove'
            })
            history.push('/list');
        }catch(e){
            console.error(e);
        }
    }

    handleCommentRemove = async () => {
        const { ModalActions, CommentActions, id, target } = this.props;

        try{
            await CommentActions.deleteComment({target, id});
            ModalActions.hideModal({
                modal : 'remove'
            });
            CommentActions.getCommentList({id});
        }catch(e){
            console.error(e);
        }
    }

    render(){
        const { handleHideModal, handlePostRemove, handleCommentRemove } = this;
        const { visible, type } = this.props;

        return(
            <AskRemoveModal
                onHide={handleHideModal}
                onPostRemove={handlePostRemove}
                onCommentRemove={handleCommentRemove}
                visible={visible}
                type={type} />
        )
    }
}

export default connect(
    (state) => ({
        visible : state.modal.getIn(['modal', 'remove']),
        type : state.modal.get('type'),
        target : state.comment.get('target')
    }),
    (dispatch) => ({
        CommentActions : bindActionCreators(commentActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(withRouter(AskRemoveModalContainer));