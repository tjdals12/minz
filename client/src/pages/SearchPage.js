import React, { Component } from 'react';
import PageTemplate from 'components/common/PageTemplate';
import InfoContainer from 'containers/common/InfoContainer';
import ListWrapper from 'components/list/ListWrapper';
import SearchListContainer from 'containers/list/SearchListContainer';

class SearchPage extends Component{
    render(){
        const { match } = this.props;
        const { keyword } = match.params;

        return(
            <PageTemplate>
                <InfoContainer current="search"/>
                <ListWrapper>
                    <SearchListContainer keyword={keyword}/>
                </ListWrapper>
            </PageTemplate>
        )
    }
}

export default SearchPage;