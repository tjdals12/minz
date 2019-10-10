import React from 'react';
import styles from './WelcomeModal.scss';
import classNames from 'classnames';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';
import { CSSTransition } from 'react-transition-group';

const cx = classNames.bind(styles);

class WelcomeModal extends React.Component{
    state = {
        modal : false
    }

    handleTransition = () => {
        this.setState({
            modal : !this.state.modal
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.visible !== this.props.visible){
            this.handleTransition();
        }
    }

    render(){
        const { modal } = this.state;
        const { visible, onHide } = this.props;

        return(
            <CSSTransition
                    in={modal}
                    timeout={500}
                    classNames="modal">
                <ModalWrapper visible={visible}>
                    <div className={cx('welcome-modal')}>
                        <h1>Welcome !</h1>
                        <p>
                            로그인 하시면 글을 작성하실 수 있습니다.<br/>
                            좋은 내용 많이 포스팅 해주세요~
                        </p>
                        <div className={cx('button-wrapper')}>
                            <Button theme='small' onClick={onHide}>확인</Button>
                        </div>
                    </div>
                </ModalWrapper>
            </CSSTransition>
        )
    }
}

export default WelcomeModal;