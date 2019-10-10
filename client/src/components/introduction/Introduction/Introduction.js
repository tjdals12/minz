import React from 'react';
import styles from './Introduction.scss';
import classNames from 'classnames/bind';
import Content from 'components/common/Content';
import Tag from 'components/common/Tag';

const cx = classNames.bind(styles);

const Introduction = ({ info, tags }) => (
    <div className={cx('introduction')}>
        <Content
            title="소개"
            description={info}
            type="introduction" />
        <div className={cx('tags')}>
            {
                tags && tags.map(
                    tag => (<Tag key={tag} to={`/search/${tag}`}>{tag}</Tag>)
                )
            }
        </div>
    </div>
)

export default Introduction;