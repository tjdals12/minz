import React, { Component } from 'react';
import PostInfo from 'components/post/PostInfo';
import PostBody from 'components/post/PostBody';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'store/modules/post';
import * as modalActions from 'store/modules/modal';

class PostInfoContainer extends Component{
    getPost = async () => {
        const { PostActions, id } = this.props;

        try{
            await PostActions.getPost(id);
        }catch(e){
            console.error(e);
        }
    }

    handleShowModal = () => {
        const { ModalActions } = this.props;
        ModalActions.showModal({
            modal : 'remove',
            type : 'post'
        });
    }

    componentDidMount(){
        this.getPost();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.id !== this.props.id){
            this.getPost();
        }
    }

    render(){
        const { user, post, postLoading, commentCount } = this.props;
        const { handleShowModal } = this;

        if(postLoading) return null;

        const { _id, title, body, writer, tags, hit, like, publishedDate } = post.toJS();

        return(
            <>
                <PostInfo
                    id={_id}
                    title={title}
                    writer={writer}
                    tags={tags}
                    hit={hit}
                    like={like}
                    commentCount={commentCount} 
                    publishedDate={publishedDate}
                    onShow={handleShowModal}
                    user={user}/>
                <PostBody markdown={body} />
            </>
        )
    }
}

export default connect(
    (state) => ({
        user : state.login.getIn(['login', 'username']),
        post : state.post.get('post'),
        commentCount : state.post.get('commentCount'),
        postLoading : state.pender.pending['post/GET_POST'],
    }),
    (dispatch) => ({
        PostActions : bindActionCreators(postActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(PostInfoContainer);