import React from 'react';
import LinkList from 'components/LinkList';
import { useSelector } from 'react-redux';

const LinkListContainer = () => {
    const links = useSelector(state => state.link.get('links').toJS(), []);

    return (
        <LinkList links={links} />
    )
}

export default LinkListContainer;