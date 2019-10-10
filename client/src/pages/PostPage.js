import React, { Component } from 'react';
import PageTemplate from 'components/common/PageTemplate';
import PostWrapper from 'components/post/PostWrapper';
import PostInfoContainer from 'containers/post/PostInfoContainer';
import PostNavContainer from 'containers/post/PostNavContainer';
import PostCommentContainer from 'containers/post/PostCommentContainer';
import AskRemoveModalContainer from 'containers/modal/AskRemoveModalContainer';

class PostPage extends Component{

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render(){
        const { match } = this.props;
        const { id } = match.params;

        return(
            <PageTemplate>
                <AskRemoveModalContainer id={id} />

                <PostWrapper>
                    <PostInfoContainer id={id}/>
                    <PostCommentContainer id={id} />

                    <PostNavContainer id={id}/>
                </PostWrapper>
            </PageTemplate>
        )
    }
}

export default PostPage;