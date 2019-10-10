import React, { Component } from 'react';
import PageTemplate from 'components/common/PageTemplate';
import InfoContainer from 'containers/common/InfoContainer';
import ListWrapper from 'components/list/ListWrapper';
import PostListContainer from 'containers/list/PostListContainer';

class ListPage extends Component{

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render(){
        const { match } = this.props;
        const { tag, page = 1 } = match.params;

        return(
            <PageTemplate>
                <InfoContainer current="list" />
                <ListWrapper>
                    <PostListContainer tag={tag} page={page}/>
                </ListWrapper>
            </PageTemplate>
        )
    }
}

export default ListPage;