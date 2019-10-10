import React, { Component } from 'react';
import ErrorModal from 'components/modal/ErrorModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';

class ErrorModalContainer extends Component{
    handleHideModal = () => {
        const { ModalActions } = this.props;
        ModalActions.hideModal({
            modal : 'error'
        })
    }

    render(){
        const { handleHideModal } = this;
        const { visible, text } = this.props;

        return(
            <ErrorModal 
                visible={visible}
                text={text}
                onHideModal={handleHideModal} />
        )
    }
}

export default connect(
    (state) => ({
        text : state.modal.get('text'),
        visible : state.modal.getIn(['modal', 'error'])
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(ErrorModalContainer);