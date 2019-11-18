import React, { useCallback } from 'react';
import WelcomeModal from 'components/modal/WelcomeModal';
import { useSelector, useDispatch } from 'react-redux';
import { close } from 'store/modules/modal';

const WelcomeModalContainer = () => {
	const isOpen = useSelector((state) => state.modal.get('welcome'), []);
	const dispatch = useDispatch();

	const handleClose = useCallback(
		(name) => {
			dispatch(close(name));
		},
		[ dispatch ]
	);

	return <WelcomeModal visible={isOpen} onClose={handleClose} />;
};

export default WelcomeModalContainer;
