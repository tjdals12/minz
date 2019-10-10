import React, { Component } from 'react';
import PageTemplate from 'components/common/PageTemplate';
import InfoContainer from 'containers/common/InfoContainer';
import ListWrapper from 'components/list/ListWrapper';
import SeriesInfoContainer from 'containers/list/SeriesInfoContainer';
import InSeriesListContainer from 'containers/list/InSeriesListContainer';
import SeriesInputModalContainer from 'containers/modal/SeriesInputModalContainer';

class SeriesPage extends Component{
    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render(){
        const { match } = this.props;
        const { seq } = match.params;

        return(
            <PageTemplate>
                <SeriesInputModalContainer />
                <InfoContainer current="series" />
                <ListWrapper>
                    <SeriesInfoContainer seq={seq} />
                    <InSeriesListContainer seq={seq}/>
                </ListWrapper>
            </PageTemplate>
        )
    }
}

export default SeriesPage;