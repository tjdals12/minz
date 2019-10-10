import React, { Component } from 'react';
import WelcomeModal from 'components/modal/WelcomeModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';

class WelcomeModalContainer extends Component{
    handleHide = () => {
        const { ModalActions } = this.props;
        ModalActions.hideModal({
            modal: 'welcome'
        })
    }

    render(){
        const { visible } = this.props;
        const { handleHide } = this;
        return(
                <WelcomeModal
                    visible={visible}
                    onHide={handleHide} />
        )
    }
}

export default connect(
    (state) => ({
        visible : state.modal.getIn(['modal', 'welcome'])
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch)
    })
)(WelcomeModalContainer);