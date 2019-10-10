import React, { Component } from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import Thumbnail from 'components/common/Thumbnail';
import { Link } from 'react-router-dom';
import FaSearch from 'react-icons/lib/fa/search';
import FaBars from 'react-icons/lib/fa/bars';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaGoogle from 'react-icons/lib/fa/google';
import FaCog from 'react-icons/lib/fa/cog';
import { CSSTransition } from 'react-transition-group';
import Button from 'components/common/Button';
import Logo from 'components/common/Logo';
import InputError from 'components/common/InputError';


const cx = classNames.bind(styles);

class Header extends Component{
    
    state = {
        scroll : "",
        sideMenu : false,
        search : false,
    }

    componentDidMount(){
        document.getElementsByClassName("short-header")[0].style.display = "none";
        document.getElementsByClassName("short-header")[0].style.opacity = 0;
        window.addEventListener('scroll', this.onScroll);
    }

    shouldComponentUpdate(prevProps, prevState){
        const { scroll } = this.state;

        const shortHeader = document.getElementById('short-header');

        if(scroll > 550 && shortHeader.style.display === "none"){
            shortHeader.style.display = "block";
        }

        if(scroll < 550 && shortHeader.style.display === "block"){
            shortHeader.style.display = "none";
        }

        if(scroll > 600 && shortHeader.style.opacity === "0"){
            shortHeader.style.opacity = 1;
        }

        if(scroll < 600 && shortHeader.style.opacity === "1"){
            shortHeader.style.opacity = 0;
        }

        return true;
    }

    onScroll = (e) => {
        const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
        this.setState({
            scroll : scrollTop
        });
    }

    handleSideMenu = () => {
        this.setState({
            sideMenu : !this.state.sideMenu,
        })
    }

    handleSearch = () => {
        this.setState({
            search : !this.state.search
        })
    }

    handleSetKeyword = (e) => {
        const { name, value } = e.target;
        const { onSetkeyword } = this.props;

        onSetkeyword({name, value});
    }

    handlePostSearch = () => {
        const { onSearch } = this.props;

        if(window.event.keyCode === 13){
            onSearch();
        }
    }

    handleShowRegisterModal = () => {
        const { onShowRegisterModal } = this.props;

        this.setState({
            sideMenu : false
        })

        setTimeout(() => {
            onShowRegisterModal();
        }, 300);
    }

    handleShowBlogConfigModal = () => {
        const { onShowBlogConfigModal } = this.props;

        this.setState({
            sideMenu : false
        })

        setTimeout(() => {
            onShowBlogConfigModal();
        }, 300);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.visible !== this.props.visible){
            this.setState({
                sideMenu : false
            })
        }
    }
    
    render(){

        const { sideMenu, search } = this.state;
        const { handleSideMenu, handleSearch, handleSetKeyword, handlePostSearch, handleShowRegisterModal, handleShowBlogConfigModal } = this;
        const { background, headerThumbnail, title, emailError, passwordError, failError, login, onSocialLogin, onChangeInput, onLocalLogin, onLogout  } = this.props;

        const { isLogin, username, thumbnail, thoughCount } = login.toJS();

        const headerImg = {
            backgroundImage : `url(${background})`,
        }

        return(
            <>
                <header className={cx("header")} style={headerImg}>
                    <div className={cx('header-content')}>
                        <Thumbnail url={headerThumbnail} type='user' />

                        <div className={cx('brand')}>
                            <span className={cx('side-menu-icon')} onClick={handleSideMenu}><FaBars /></span>
                            <Link className={cx('home')} to='/'>Minz Log.<span>beta</span></Link>
                        </div>

                        <div className={cx('header-title')}>
                            <div>{title}</div>
                        </div>

                        <div className={cx('search')}>
                            <CSSTransition
                                in={search}
                                timeout={300}
                                classNames="searchBar">
                                <input name="keyword" className={cx('keyword')} placeholder="포스트" onChange={handleSetKeyword} onKeyUp={handlePostSearch}/>
                            </CSSTransition>
                            <span className={cx('search-icon')} onClick={handleSearch}><FaSearch /></span>
                        </div>
                    </div>
                </header>

                <CSSTransition
                    in={sideMenu}
                    timeout={400}
                    classNames="side">
                    <div className={cx('side-menu-box')}>
                        <Logo />
                        {
                            isLogin 
                            ?
                            <div className={cx('guest-profile')}>
                                <Thumbnail url={thumbnail} type='side-user' />
                                <div className={cx('description')}>
                                    <p className={cx('my-name')}>{username}</p>
                                    <p className={cx('my-post')}>내 글 : {thoughCount}</p>
                                </div>

                                <div className={cx('separator-line')} />

                                <div className={cx('button-wrapper')}>
                                    <Button theme='small' onClick={onLogout}>로그아웃</Button>
                                </div>

                                <div className={cx('button-wrapper')}>
                                    <Button theme='small' to='/editor'>새 포스트 작성</Button>
                                </div>
                            </div>
                            :
                            <div className={cx('login-form')}>
                                <div className={cx('top-wrapper')}>
                                    <h3 className={cx('welcome-title')}>Welcome, developer</h3>
                                    <div className={cx('button-wrapper')}>
                                        <Button theme='facebook' onClick={() => onSocialLogin('facebook')}><FaFacebook/> Facebook</Button>
                                        <Button theme='google' onClick={() => onSocialLogin('google')}><FaGoogle/> Google</Button>
                                    </div>
                                    <div className={cx('bottom-wrapper')}>
                                        <div className={cx('form-wrapper')}>
                                            <p className={cx('label')}>Email</p>
                                            <input type='text' name='email' className={cx('login-input')} placeholder='Your email' onChange={(e) => onChangeInput(e.target)}/>
                                            <InputError error={emailError} />
                                            <p className={cx('label')}>Password</p>
                                            <input type='password' name='password' className={cx('login-input')} placeholder='Password' onChange={(e) => onChangeInput(e.target)} onKeyUp={(e) => {if(e.keyCode === 13){onLocalLogin()}}}/>
                                            <InputError error={passwordError} />
                                            <InputError error={failError} />
                                        </div>

                                        <div className={cx('local-button')}>
                                            <Button theme='login' onClick={onLocalLogin}>Login</Button>
                                            <Button theme='register' onClick={handleShowRegisterModal}>Register</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={cx('close-btn')} onClick={handleSideMenu}><FaAngleLeft /></div>
                        
                        {
                            (isLogin && username === "Minz-logger") &&
                            <div className={cx('config-wrapper')}>
                                <Button theme='icon' onClick={handleShowBlogConfigModal}><FaCog /></Button>
                            </div>
                        }
                    </div>
                </CSSTransition>

                <div id="short-header" className={cx("short-header")}>
                    <div className={cx('header-content')}>
                        <div className={cx('header-title')}>
                            <Thumbnail url={require('asset/img/header-logo.png')} type='header-logo'/>
                        </div>

                        <div className={cx('brand')}>
                            <span className={cx('side-menu-icon')} onClick={handleSideMenu}><FaBars /></span>
                            <Link className={cx('home')} to='/'>Minz Log.<span>beta</span></Link>
                        </div>

                        <div className={cx('search')}>
                        <CSSTransition
                                in={search}
                                timeout={300}
                                classNames="searchBar">
                                <input name="keyword" className={cx('keyword')} placeholder="포스트" onChange={handleSetKeyword} onKeyUp={handlePostSearch}/>
                            </CSSTransition>
                            <span className={cx('search-icon')} onClick={handleSearch}><FaSearch /></span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;