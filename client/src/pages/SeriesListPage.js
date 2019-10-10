import React, { Component } from 'react';
import PageTemplate from 'components/common/PageTemplate';
import InfoContainer from 'containers/common/InfoContainer';
import ListWrapper from 'components/list/ListWrapper';
import SeriesInputModalContainer from 'containers/modal/SeriesInputModalContainer';
import SeriesToolbarContainer from 'containers/list/SeriesToolbarContainer';
import SeriesListContainer from 'containers/list/SeriesListContainer';

class SeriesPage extends Component{

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render(){
        const { match } = this.props;
        const { page = 1 } = match.params;

        return(
            <PageTemplate>
                <InfoContainer current="series" />
                <ListWrapper>
                    <SeriesToolbarContainer />
                    <SeriesListContainer page={page}/>
                </ListWrapper>
    
                <SeriesInputModalContainer />
            </PageTemplate>
        )
    }
}

export default SeriesPage;