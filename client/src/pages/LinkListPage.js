import React from 'react';
import ScrollToTop from 'components/common/ScrollToTop';
import LinkListContainer from 'containers/LinkListContainer';
import PaginationContainer from 'containers/PaginationContainer';

const LinkListPage = () => {
    return (
        <ScrollToTop>
            <LinkListContainer />
            <PaginationContainer type="link"/>
        </ScrollToTop>
    )
}

export default LinkListPage;