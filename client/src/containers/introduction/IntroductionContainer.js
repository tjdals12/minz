import React, { Component } from 'react';
import Introduction from 'components/introduction/Introduction';
import { connect } from 'react-redux';

class IntroductionContainer extends Component{
    render(){
        const { info, tags, loading } = this.props;

        return(
            <Introduction
                info={info}
                tags={tags} />
        )
    }
}

export default connect(
    (state) => ({
        info: state.blog.getIn(['blog', 'info']),
        tags: state.blog.getIn(['blog', 'tags']),
    })
)(IntroductionContainer);