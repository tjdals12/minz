import React from 'react';
import Links from 'components/Links';
import { useSelector } from 'react-redux';

const LinksContainer = () => {
    const links = useSelector(state => state.link.get('links').toJS(), []);

    return links.length >0 ? <Links links={links} /> : null;
}

export default LinksContainer;