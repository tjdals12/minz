import React from 'react';
import classNames from 'classnames';
import styles from './ModalWrapper.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const ModalWrapper = ({ visible, children }) => {
	return !visible ? null : (
		<div>
			<div className={cx('overlay')} />
			<div className={cx('modal-wrapper')}>
				<div className={cx('modal')}>{children}</div>
			</div>
		</div>
	);
};

ModalWrapper.propTypes = {
	visible: PropTypes.bool,
	children: PropTypes.oneOfType([ PropTypes.string, PropTypes.func, PropTypes.node ])
};

ModalWrapper.defaultProps = {
	visible: false,
	children: 'Modal'
};

export default ModalWrapper;
