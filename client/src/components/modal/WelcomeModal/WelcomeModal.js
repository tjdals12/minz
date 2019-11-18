import React from 'react';
import classNames from 'classnames';
import styles from './WelcomeModal.scss';
import { CSSTransition } from 'react-transition-group';
import ModalWrapper from 'components/modal/ModalWrapper';
import { Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const WelcomeModal = ({ visible, onClose }) => (
	<CSSTransition in={visible} timeout={500} classNames="modal">
		<ModalWrapper visible={visible}>
			<div className={cx('welcome-modal')}>
				<h1>Welcome !</h1>
				<p>
					로그인 하시면 글을 작성하실 수 있습니다.<br />
					좋은 내용 많이 포스팅 해주세요~
				</p>
				<div className={cx('button-wrapper')}>
					<Button theme="small" onClick={() => onClose('welcome')}>
						확인
					</Button>
				</div>
			</div>
		</ModalWrapper>
	</CSSTransition>
);

WelcomeModal.propTypes = {
	visible: PropTypes.bool,
	onClose: PropTypes.func
};

WelcomeModal.defaultProps = {
	visible: false,
	onClose: () => console.warn('Warning: onClose is not defined')
};

export default WelcomeModal;
