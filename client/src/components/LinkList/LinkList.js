import React from 'react';
import classNames from 'classnames/bind';
import styles from './LinkList.scss';
import { Wrapper } from 'components/common';
import LinkItem from './LinkItem';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const LinkList = ({ links }) => {
    return (
        <Wrapper className={cx('link-list')}>
            {links.map(({ _id, title, to, publishedDate }) => (
                <LinkItem key={_id} title={title} to={to} publishedDate={publishedDate}/>
            ))}
        </Wrapper>
    )
}

LinkList.propTypes = {
    links: PropTypes.array
};

LinkList.defaultProps = {
    links: []
};

export default LinkList;