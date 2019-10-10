import React, { Component } from 'react';
import SocialRegisterModal from 'components/modal/SocialRegisterModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as registerActions from 'store/modules/register';
import validate from 'validate.js';

class SocialRegisterModalContainer extends Component{
    handleHideModal = () => {
        const { ModalActions } = this.props;
        ModalActions.hideModal({
            modal: 'social'
        })
    }

    handleChangeInput = (e) => {
        const { name, value } = e.target;
        const { RegisterActions } = this.props;
        RegisterActions.changeInput({name, value});    
    }

    handleSocialRegister = async () => {
        const { username, ModalActions,  RegisterActions, socialInfo } = this.props;

        const register = {
            username,
            provider: socialInfo.get('provider'),
            accessToken: socialInfo.get('accessToken')
        }

        const constraints = {
            username: {
                length: {
                    minimum: 2,                 
                    tooShort: "^닉네임은 %{count}자 이상입니다."
                },
                format: {
                    pattern: "[a-zA-Z0-9가-힣]+",
                    flags: "i",
                    message: "^닉네임에는 특수문자를 사용할 수 없습니다."
                }
            }
        }

        const error = validate(register, constraints);

        if(error){
            ModalActions.setErrors(error);
            return;
        }

        try{
            const { data } = await RegisterActions.registerSocial(register);

            if(!data.profile.username)
                return;

            ModalActions.hideModal({
                modal: 'social'
            });

            ModalActions.showModal({
                modal: 'welcome'
            })
        }catch(e){
            console.log(e);
        }
    }

    render(){
        const { visible, socialInfo, error, failError } = this.props;
        const { handleHideModal, handleChangeInput, handleSocialRegister } = this;

        const { provider } = socialInfo.toJS();

        const { 
            username: usernameError
        } = error ? error.toJS() : { };

        const {
            fail
        } = failError ? failError.toJS() : { };

        return(
            <SocialRegisterModal
                usernameError={usernameError}
                failError={fail}
                visible={visible}
                provider={provider}
                onHideModal={handleHideModal}
                onChangeInput={handleChangeInput}
                onSocialRegister={handleSocialRegister} />
        )
    }
}

export default connect(
    (state) => ({
        username : state.register.get('username'),
        visible : state.modal.getIn(['modal', 'social']),
        error : state.modal.get('error'),
        failError: state.register.get('error'),
        socialInfo : state.login.get('socialInfo')
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch),
        RegisterActions : bindActionCreators(registerActions, dispatch)
    })
)(SocialRegisterModalContainer);