import React, { Component } from 'react';
import RegisterModal from 'components/modal/RegisterModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as registerActions from 'store/modules/register';
import validate from 'validate.js';

class RegisterModalContainer extends Component{
    handleHideModal = () => {
        const { ModalActions } = this.props;
        ModalActions.hideModal({
            modal: 'register'
        })
    }

    handleChangeInput = (e) => {
        const { name, value } = e.target;
        const { RegisterActions } = this.props;
        RegisterActions.changeInput({name, value});
    }

    handleRegisterLocal = async () => {
        const { RegisterActions, ModalActions, email, password, username } = this.props;

        const register = {
            email,
            password,
            username
        }

        const constraints = {
            email: {
                email: {
                    message: () => "^잘못된 형식의 이메일 입니다."
                }
            },
            password: {
                length: {
                    minimum: 4,
                    tooShort: "^비밀번호는 %{count}자 이상 입니다.",
                    maximum: 12,
                    tooLong: "^비밀번호는 %{count}자 이하 입니다."
                }
            },
            username: {
                format: {
                  pattern: "[a-z0-9]+",
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
            const { data } = await RegisterActions.registerLocal(register);

            if(!data.username){
                return;
            }

            ModalActions.hideModal({
                modal: 'register'
            })

            ModalActions.showModal({
                modal: 'welcome'
            })
        }catch(e){
            console.error(e);
        }
    }

    render(){
        const { error, failError, visible } = this.props;
        const { handleHideModal, handleChangeInput, handleRegisterLocal } = this;

        const {
            email: emailError, 
            password: passwordError, 
            username: usernameError
        } = error ? error.toJS() : { };

        const {
            fail
        } = failError ? failError.toJS() : { };

        return(
            <RegisterModal
                emailError={emailError}
                passwordError={passwordError}
                usernameError={usernameError}
                failError={fail}
                visible={visible}
                onHideModal={handleHideModal}
                onChangeInput={handleChangeInput}
                onRegisterLocal={handleRegisterLocal} />
        )
    }
}

export default connect(
    (state) => ({
        username : state.register.get('username'),
        password : state.register.get('password'),
        email : state.register.get('email'),
        error : state.modal.get('error'),
        failError: state.register.get('error'),
        visible : state.modal.getIn(['modal', 'register']),
    }),
    (dispatch) => ({
        ModalActions : bindActionCreators(modalActions, dispatch),
        RegisterActions : bindActionCreators(registerActions, dispatch)
    })
)(RegisterModalContainer);