import React from 'react';
import Links from 'components/Links';
import { useSelector } from 'react-redux';

const LinksContainer = () => {
    const links = useSelector(state => state.link.get('links').toJS(), []);

    return (
        <Links links={links} />
    )
}

export default LinksContainer;