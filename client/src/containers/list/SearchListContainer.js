import React, { Component } from 'react';
import SearchList from 'components/list/SearchList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'store/modules/list';

class SearchListContainer extends Component{
    getSearchList = async () => {
        const { ListActions, keyword } = this.props;
        await ListActions.getSearchList(keyword);
    }

    componentDidMount(){
        const { keyword } = this.props;

        if(keyword){
            this.getSearchList();
        }
    }
    
    render(){
        const { posts, loading } = this.props;

        if(loading) return null;

        return(
            <SearchList
                searchPost={posts} />
        )
    }
}

export default connect(
    (state) => ({
        posts : state.list.get('posts'),
        loading : state.pender.pending['list/GET_SEARCH_LIST']
    }),
    (dispatch) => ({
        ListActions : bindActionCreators(listActions, dispatch)
    })
)(SearchListContainer);