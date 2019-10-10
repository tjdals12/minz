import React, { Component } from 'react';
import Info from 'components/common/Info';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'store/modules/post';
import * as seriesActions from 'store/modules/series';

class InfoContainer extends Component{

    componentDidMount(){
        const { PostActions, SeriesActions } = this.props;
        PostActions.getCount();
        SeriesActions.getCount();
    }
    
    render(){
        const { name, description, current, postCount, todayPostCount, seriesCount, postLoading, seriesLoading } = this.props;

        if(postLoading || seriesLoading){
            return(
                <Info
                name={name}
                description={description}
                current={current} 
                postCount="0"
                seriesCount="0" /> 
            )
        }

        return(
            <Info
                name={name}
                description={description}
                current={current} 
                postCount={postCount}
                todayPostCount={todayPostCount}
                seriesCount={seriesCount} />
        )
    }
}

export default connect(
    (state) => ({
        name : state.blog.getIn(['blog', 'name']),
        description : state.blog.getIn(['blog', 'description']),
        postCount : state.post.get('postCount'),
        todayPostCount : state.post.get('todayPostCount'),
        seriesCount : state.series.get('seriesCount'),
        postLoading : state.pender.pending['post/GET_COUNT'],
        seriesLoading : state.pender.pending['series/GET_COUNT']
    }),
    (dispatch) => ({
        PostActions : bindActionCreators(postActions, dispatch),
        SeriesActions : bindActionCreators(seriesActions, dispatch)
    })
)(InfoContainer);