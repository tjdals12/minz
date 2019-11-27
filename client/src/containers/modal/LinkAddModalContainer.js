import React, { useReducer, useCallback } from 'react';
import LinkAddModal from 'components/modal/LinkAddModal';
import { useSelector, useDispatch } from 'react-redux';
import { close } from 'store/modules/modal';
import { addLink } from 'store/modules/link';

const reducer = (state, action) => {
    return ({
        ...state,
        [action.name]: action.value
    })
}

const LinkAddModalContainer = () => {
    const [ state, dispatch ] = useReducer(reducer, {
        title: '',
        to: ''
    })
    const isOpen = useSelector((state) => state.modal.get('linkAdd'), []);
    const rDispatch = useDispatch();

    const handleClose = useCallback((name) => {
        rDispatch(close(name))
    }, [rDispatch])

    const handleChange = useCallback((e) => {
        dispatch(e.target)
    }, [dispatch])

    const handleAdd = useCallback(() => {
        rDispatch(addLink(state));
        rDispatch(close('linkAdd'));
    }, [rDispatch, state])

    return (
        <LinkAddModal 
            visible={isOpen} 
            onClose={handleClose}
            onChange={handleChange}
            onAdd={handleAdd}
        />
    )
}

export default LinkAddModalContainer;