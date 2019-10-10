import React, { Component } from 'react';
import SeriesToolbar from 'components/list/SeriesToolbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as seriesActions from 'store/modules/series';

class SeriesToolbarContainer extends Component{
    handleShowModal = () => {
        const { SeriesActions, ModalActions } = this.props;
        ModalActions.showModal({
            modal : 'series'
        })
    }

    render(){
        const { handleShowModal } = this;
        const { isLogin } = this.props;

        return(
            <SeriesToolbar
                visible={isLogin}
                onShowModal={handleShowModal} />
        )
    }
}

export default connect(
    (state) => ({
        isLogin : state.login.getIn(['login', 'isLogin'])
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch),
        SeriesActions : bindActionCreators(seriesActions, dispatch)
    })
)(SeriesToolbarContainer);