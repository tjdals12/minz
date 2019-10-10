import React, { Component } from 'react';
import SeriesInfo from 'components/list/SeriesInfo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as seriesActions from 'store/modules/series';
import * as modalActiosn from 'store/modules/modal';

class SeriesInfoContainer extends Component{

    getSeries = () => {
        const { SeriesActions, seq } = this.props;
        SeriesActions.getSeries(seq);
    }

    handleShowModal = () => {
        const { ModalActions } = this.props;

        ModalActions.showModal({
            modal: "series"
        })
    }

    handleToggleSeries = (dispGb) => {
        const { SeriesActions, series } = this.props;
        const { seq } = series;

        console.log(`seq : ${seq}`);
        console.log(`dispGb : ${dispGb}`)

        SeriesActions.toggleSeries({seq, dispGb});
    }

    componentDidMount(){
        this.getSeries();
    }
    
    render(){
        const { username, inSeries, series, loading } = this.props;

        if(loading) return null;

        const { name, description, writer, keyword, dispGb, finishGb, publishedDate } = series;
        const { handleShowModal, handleToggleSeries } = this;

        return(
            <SeriesInfo
                username={username}
                name={name}
                description={description}
                writer={writer}
                keyword={keyword}
                count={inSeries.size}
                dispGb={dispGb}
                finishGb={finishGb}
                publishedDate={publishedDate}
                onShowModal={handleShowModal}
                onToggleSeries={handleToggleSeries} />
        )
    }
}

export default connect(
    (state) => ({
        username : state.login.getIn(['login', 'username']),
        series : state.series.get('series'),
        inSeries : state.series.get('inSeries'),
        loading : state.pender.pending['series/GET_SERIES']
    }),
    (dispatch) => ({
        SeriesActions : bindActionCreators(seriesActions, dispatch),
        ModalActions : bindActionCreators(modalActiosn, dispatch)
    })
)(SeriesInfoContainer);