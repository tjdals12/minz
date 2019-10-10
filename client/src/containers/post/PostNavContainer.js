import React, { Component } from 'react';
import PostNav from 'components/post/PostNav';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'store/modules/post';

class PostNavContainer extends Component{

    handlePrevPost = () => {
        const { PostActions, navPost } = this.props;
        const { _id } = navPost.toJS();
        PostActions.getPrevPost(_id);
    }

    handleNextPost = () => {
        const { PostActions, navPost } = this.props;
        const { _id } = navPost.toJS();
        PostActions.getNextPost(_id);
    }

    render(){
        const { navPost, loading, prevLoading, nextLoading } = this.props;
        const { handlePrevPost, handleNextPost } = this;

        const { _id, title, publishedDate } = navPost.toJS();

        return(
            <PostNav
                id={_id}
                title={title}
                isNext={publishedDate}
                onPrev={handlePrevPost}
                onNext={handleNextPost}
                loading={loading || prevLoading || nextLoading}/>
        )
    }
}

export default connect(
    (state) => ({
        post : state.post.get('post'),
        navPost : state.post.get('navPost'),
        loading : state.pender.pending['post/GET_POST'],
        prevLoading : state.pender.pending['post/GET_PREV_POST'],
        nextLoading : state.pender.pending['post/GET_NEXT_POST']
    }),
    (dispatch) => ({
        PostActions : bindActionCreators(postActions, dispatch)
    })
)(PostNavContainer);