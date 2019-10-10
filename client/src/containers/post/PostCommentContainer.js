import React, { Component } from 'react';
import PostComment from 'components/post/PostComment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from 'store/modules/comment';
import * as modalActions from 'store/modules/modal';

class PostCommentContainer extends Component{
    state = {
        page : 1
    }

    getCommentList = () => {
        const { CommentActions, id } = this.props;
        const { page } = this.state;
        CommentActions.getCommentList({id, page});
    }

    handleChange = ({name, value}) => {
        const { CommentActions } = this.props;
        CommentActions.changeInput({name, value});
    }

    handleComment = async () => {
        const { CommentActions, content, id } = this.props;
        
        const comment = {
            content,
            postId : id
        };

        try{
            await CommentActions.writeComment(comment);
            this.getCommentList();
        }catch(e){
            console.error(e);
        }
    }

    handleCommentPage = (page) => {
        this.setState({
            page : page
        })
    }

    handleShowModal = (id) => {
        const { ModalActions, CommentActions } = this.props;
        ModalActions.showModal({
            modal : 'remove',
            type : 'comment'
        })

        CommentActions.targetSetting({
            target : id
        })
    }

    componentDidMount(){
        this.getCommentList();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.page !== this.state.page){
            this.getCommentList()
        }

        if(prevProps.id !== this.props.id){
            this.getCommentList();
        }
    }

    render(){
        const { user, content, comments, commentCount, lastPage, loading } = this.props;
        const { handleChange, handleComment, handleCommentPage, handleShowModal } = this;
        const { page } = this.state;

        return(
            <PostComment user={user}
                         content={content}
                         comments={comments} 
                         commentCount={commentCount}
                         page={page}
                         lastPage={lastPage}
                         onComment={handleComment}
                         onCommentPage={handleCommentPage}
                         onChange={handleChange}
                         onShowModal={handleShowModal}
                         loading={loading}/>
        )
    }
}

export default connect(
    (state) => ({
        user : state.login.getIn(['login', 'username']),
        content : state.comment.get('content'),
        comments : state.comment.get('comments'),
        commentCount : state.comment.get('commentCount'),
        lastPage : state.comment.get('lastPage'),
        loading : state.pender.pending['comment/GET_COMMENT_LIST'],
    }),
    (dispatch) => ({
        CommentActions : bindActionCreators(commentActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(PostCommentContainer);