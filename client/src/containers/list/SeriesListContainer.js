import React, { Component } from 'react';
import SeriesList from 'components/list/SeriesList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as seriesActions from 'store/modules/series';
import Pagination from 'components/list/Pagination';

class SeriesListContainer extends Component{

    getSeriesList = () => {
        const { SeriesActions, page } = this.props;
        SeriesActions.initialize();
        SeriesActions.getSeriesList({page});
    }

    componentDidMount = () => {
        this.getSeriesList();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.page !== this.props.page){
            this.getSeriesList();
        }
    }
    
    render(){
        const { seriesList, loading, page, lastPage } = this.props;

        console.log(`Page : ${page}`);
        console.log(`LastPage : ${lastPage}`);

        if(loading) return null;

        return(
            <>
                <SeriesList
                seriesList={seriesList}/>
                <Pagination
                    type="series"
                    page={parseInt(page, 10)}
                    lastPage={parseInt(lastPage, 10)} />
            </>
            
        )
    }
}

export default connect(
    (state) => ({
        seriesList : state.series.get('seriesList'),
        lastPage : state.series.get('lastPage'),
        loading : state.pender.pending['series/GET_SERIES']
    }),
    (dispatch) => ({
        SeriesActions : bindActionCreators(seriesActions, dispatch)
    })
)(SeriesListContainer);