import React from 'react';
import classNames from 'classnames';
import styles from './AskRemoveModal.scss';
import ModalWrapper from 'components/modal/ModalWrapper';
import { Button } from 'components/common';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const AskRemoveModal = ({ visible, type, onClose, onPostRemove, onCommentRemove }) => (
	<CSSTransition in={visible} timeout={150} classNames="remove">
		<ModalWrapper visible={visible}>
			<div className={cx('question')}>
				<div className={cx('title')}>{type === 'post' ? '포스트 삭제' : '댓글 삭제'}</div>
				<div className={cx('description')}>{type === 'post' ? '포스트를' : '댓글을'} 정말 삭제하시겠습니까?</div>
			</div>

			<div className={cx('options')}>
				<Button onClick={() => onClose('askRemove')}>취소</Button>
				{type === 'post' ? (
					<Button onClick={() => onPostRemove()} theme="green">
						삭제
					</Button>
				) : (
					<Button onClick={() => onCommentRemove()} theme="green">
						삭제
					</Button>
				)}
			</div>
		</ModalWrapper>
	</CSSTransition>
);

AskRemoveModal.propTypes = {
	visible: PropTypes.bool,
	type: PropTypes.string,
	onClose: PropTypes.func,
	onPostRemove: PropTypes.func,
	onCommentRemove: PropTypes.func
};

AskRemoveModal.defaultProps = {
	visible: false,
	onClose: () => console.warn('Warning: onHide is not defined'),
	onPostRemove: () => console.warn('Warning: onPostRemove is not defined'),
	onCommentRemove: () => console.warn('Warning: onCommentRemove is not defined')
};

export default AskRemoveModal;
