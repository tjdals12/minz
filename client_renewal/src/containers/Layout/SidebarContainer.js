import React from 'react';
import Sidebar from 'components/Layout/Sidebar';
import { useDispatch } from 'react-redux';
import { open } from 'store/modules/modal';

const SidebarContainer = () => {
	const dispatch = useDispatch();

	const onOpen = (name) => {
		document.querySelector('.sidebar').classList.remove('sidebar--open');
		dispatch(open(name));
	};

	return <Sidebar onOpen={onOpen} />;
};

export default SidebarContainer;
