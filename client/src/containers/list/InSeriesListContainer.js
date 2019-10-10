import React, { Component } from 'react';
import InSeriesList from 'components/list/InSeriesList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as seriesActions from 'store/modules/series';

class InSeriesListContainer extends Component{

    render(){

        const { username, writer, seq, inSeries, loading } = this.props;

        if(loading) return null;

        return(
            <InSeriesList
                username={username}
                writer={writer}
                seq={seq}
                inSeries={inSeries} />
        )
    }
}

export default connect(
    (state) => ({
        username : state.login.getIn(['login', 'username']),
        writer : state.series.getIn(['series', 'writer']),
        inSeries : state.series.get('inSeries'),
        loading : state.pender.pending['series/getSeries']
    }),
    (dispatch) => ({
        SeriesActions : bindActionCreators(seriesActions, dispatch)
    })
)(InSeriesListContainer);