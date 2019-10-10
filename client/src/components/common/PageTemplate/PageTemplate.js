import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import HeaderContainer from 'containers/common/HeaderContainer';
import RegisterModalContainer from 'containers/modal/RegisterModalContainer';
import WelcomeModalContainer from 'containers/modal/WelcomeModalContainer';
import ErrorModalContainer from 'containers/modal/ErrorModalContainer';
import SocialRegisterModalContainer from 'containers/modal/SocialRegisterModalContainer';
import BlogConfigModalContainer from 'containers/modal/BlogConfigModalContainer';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => (
    <div className={cx('page-template')}>
        <WelcomeModalContainer />
        <RegisterModalContainer />
        <ErrorModalContainer />
        <SocialRegisterModalContainer />
        <BlogConfigModalContainer />
        <HeaderContainer />
        <main>  
            {children}  
        </main>
    </div>
)

export default PageTemplate;