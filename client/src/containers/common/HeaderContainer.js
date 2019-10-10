import React, { Component } from 'react';
import Header from 'components/common/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as listActions from 'store/modules/list';
import * as modalActions from 'store/modules/modal';
import * as styleActions from 'store/modules/style';
import * as loginActions from 'store/modules/login';
import * as blogActions from 'store/modules/blog';
import validate from 'validate.js';

class HeaderContainer extends Component{ 
    handleBlogInfo = async () => {
        const { BlogActions } = this.props;
        await BlogActions.getBlogInfo();
    }

    handleSetkeyword = ({name, value}) => {
        const { ListActions } = this.props;
        ListActions.setKeyword({name, value});
    }

    handleSearch = async () => {
        const { ListActions, keyword, history } = this.props;
        await ListActions.getSearchList(keyword); 
        history.push('/search');
    }

    handleChageInput = ({name, value}) => {
        const { LoginActions } = this.props;
        LoginActions.changeInput({name, value});
    }

    handleLocalLogin = async () => {
        const { LoginActions, form } = this.props;
        const { email, password } = form.toJS();

        const constraints = {
            email: {
                email: {
                    message: () => "^잘못된 계정 정보 입니다."
                },
            },
            password: {
                length: {
                    minimum: 1,
                    tooShort: "^비밀번호를 입력 해주세요."
                }
            }
        }

        const error = validate({email, password}, constraints);

        if(error){
            LoginActions.setErrors(error);
            return;
        }

        try{
            await LoginActions.loginLocal(email, password);
        }catch(e){
            console.error(e);
        }
    }

    handleSocialLogin = async (provider) => {
        const { LoginActions, ModalActions } = this.props;

        try{
            await LoginActions.providerLogin(provider);

            const { socialInfo } = this.props;

            await LoginActions.socialLogin({
                provider,
                accessToken: socialInfo.get('accessToken')
            })

            const { redirectToRegister } = this.props;

            if(redirectToRegister){
                ModalActions.showModal({
                    modal: 'social'
                })
            }
        }catch(e){
            console.error(e);
        }
    }

    handleLogout = async () => {
        const { LoginActions } = this.props;

        try{
            await LoginActions.logout();
        }catch(e){
            console.log(e);
        }
    }

    handleShowRegisterModal = () => {
        const { ModalActions } = this.props;
        ModalActions.showModal({
            modal: 'register'
        })
    }

    handleShowBlogConfigModal = () => {
        const { ModalActions } = this.props;
        ModalActions.showModal({
            modal: 'blog'
        })
    }

    handleLoginCheck = async () => {
        const { LoginActions } = this.props;

        try{
            await LoginActions.loginCheck();
        }catch(e){
            
        }
    }

    componentDidMount(){
        this.handleLoginCheck();
        this.handleBlogInfo();
    }

    render(){
        const { handleSetkeyword, handleSearch, handleLocalLogin, handleSocialLogin, handleShowRegisterModal, handleShowBlogConfigModal, handleChageInput, handleLogout } = this;
        const { background, headerThumbnail, title, error, login, visible, loading } = this.props;

        if(loading) return null;

        const {
            email: emailError,
            password: passwordError,
            fail: failError
        } = error ? error.toJS() : { };

        return(
            <Header
                background={background}
                headerThumbnail={headerThumbnail}
                title={title}
                emailError={emailError}
                passwordError={passwordError}
                failError={failError}
                login={login}
                visible={visible}
                onSetkeyword={handleSetkeyword}
                onSearch={handleSearch}
                onLocalLogin={handleLocalLogin}
                onSocialLogin={handleSocialLogin}
                onLogout={handleLogout}
                onShowRegisterModal={handleShowRegisterModal}
                onShowBlogConfigModal={handleShowBlogConfigModal}
                onChangeInput={handleChageInput} />
        )
    }
}

export default connect(
    (state) => ({
        background : state.blog.getIn(['blog', 'background']),
        headerThumbnail : state.blog.getIn(['blog', 'thumbnail']),
        title : state.blog.getIn(['blog', 'title']),
        error : state.login.get('error'),
        form : state.login.get('form'),
        login : state.login.get('login'),
        target : state.style.getIn(['target', 'side']),
        keyword : state.list.get('keyword'),
        socialInfo : state.login.get('socialInfo'),
        redirectToRegister: state.login.get('redirectToRegister'),
        visible : state.modal.getIn(['modal', 'social']),
        loading : state.pender.pending['blog/GET_BLOG_INFO'],
    }),
    (dispatch) => ({
        ListActions : bindActionCreators(listActions, dispatch),
        ModalActions : bindActionCreators(modalActions, dispatch),
        StyleActions : bindActionCreators(styleActions, dispatch),
        LoginActions : bindActionCreators(loginActions, dispatch),
        BlogActions : bindActionCreators(blogActions, dispatch)
    })
)(withRouter(HeaderContainer));