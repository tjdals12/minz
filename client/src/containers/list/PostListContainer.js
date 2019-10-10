import React, { Component } from 'react';
import PostList from 'components/list/PostList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'store/modules/list';
import Pagination from 'components/list/Pagination';

class PostListContainer extends Component{
    getPostList = () => {
        const { ListActions, tag, page } = this.props;
        ListActions.getPostList({tag, page});
    }

    componentDidMount(){
        this.getPostList();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.page !== this.props.page || prevProps.tag !== this.props.tag){
            this.getPostList();
        }
    }

    render(){
        const { posts, loading, tag, page, lastPage } = this.props;

        if(loading) return null;

        return(
            <>
                <PostList posts={posts} />
                <Pagination
                    type="post"
                    tag={tag}
                    page={parseInt(page, 10)}
                    lastPage={parseInt(lastPage, 10)} />
            </>
        )
    }
}

export default connect(
    (state) => ({
        posts : state.list.get('posts'),
        lastPage : state.list.get('lastPage'),
        loading : state.pender.pending['list/GET_POST_LIST']
    }),
    (dispatch) => ({
        ListActions : bindActionCreators(listActions, dispatch)
    })
)(PostListContainer);