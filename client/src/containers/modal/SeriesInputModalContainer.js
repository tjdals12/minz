import React, { Component } from 'react';
import SeriesInputModal from 'components/modal/SeriesInputModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as seriesActions from 'store/modules/series';
import axios from 'axios';

class SeriesInputModalContainer extends Component{

    handleSeries = async () => {
        const { ModalActions, SeriesActions, series } = this.props;

        const { 
            thumbnail: thumb, 
            name,
            description,
            keyword
        } = series;

        const seriesCreate = {
            thumb,
            name,
            description,
            keyword : keyword === "" ? [] : [...new Set(keyword.split(',').map(k => k.trim()))]
        }

        try{
            await SeriesActions.createSeries(seriesCreate);
            ModalActions.hideModal({
                modal : 'series'
            });
        }catch(e){
            console.log(e);
        }
    }

    handleSeriesUpdate = async () => {
        const { ModalActions, SeriesActions, series } = this.props;

        const {
            seq,
            thumbnail: thumb,
            name,
            description,
            keyword
        } = series;

        let validKeyword = null;
        if(typeof keyword === "string"){
            validKeyword = keyword === "" ? [] : [...new Set(keyword.split(',').map(keyword => keyword.trim()))]
        }else{
            validKeyword = keyword
        }

        const seriesUpdate = {
            series: seq,
            thumb,
            name,
            description,
            keyword: validKeyword
        }

        try{
            await SeriesActions.updateSeries(seriesUpdate);
            ModalActions.hideModal({
                modal: 'series'
            });
        }catch(e){
            console.log(e);
        }
    }

    handleChangeInput = ({name, value}) => {
        const { SeriesActions } = this.props;
        SeriesActions.changeInput({name, value});
    }

    handleHideModal = () => {
        const { ModalActions } = this.props;
        ModalActions.hideModal({
            modal : 'series'
        })
    }

    handleUpload = async (file) => {
        const { SeriesActions } = this.props;

        var formData = new FormData();
        formData.append("imgUploader", file);

        await axios({
            method: "POST",
            url: "/upload",
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then((response) => {
            SeriesActions.changeInput({
                name : "thumb",
                value : response.data
            })
        });

        await SeriesActions.getSeriesList();
    }

    render(){
        const { writer, visible, series, loading } = this.props;

        if(loading) return null;

        const { handleSeries, handleSeriesUpdate, handleChangeInput, handleHideModal, handleUpload } = this;

        const { seq, name, description, thumbnail, keyword } = series;

        return(
            <SeriesInputModal
                writer={writer}
                thumb={thumbnail}
                seq={seq}
                name={name}
                description={description}
                keyword={keyword}
                onSeries={handleSeries}
                onSeriesUpdate={handleSeriesUpdate}
                onUpload={handleUpload}
                onChangeInput={handleChangeInput}
                onHideModal={handleHideModal}
                visible={visible} />
        )
    }
}

export default connect(
    (state) => ({
        writer : state.login.getIn(['login', 'username']),
        series : state.series.get('series'),
        visible : state.modal.getIn(['modal', 'series']),
        loading : state.pender.pending['series/GET_SERIES']
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch),
        SeriesActions : bindActionCreators(seriesActions, dispatch)
    })
)(SeriesInputModalContainer);