import React from 'react';
import styles from './Info.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import Count from 'components/common/Count';
import Content from 'components/common/Content';

const cx = classNames.bind(styles);

const Info = ({name, description, current, postCount, todayPostCount, seriesCount}) => (
    <div className={cx('info-wrapper')}>
        <Content
            title={name}
            description={description}
            type="user" />

        <div className={cx('blog-info')}>
            <Count count={todayPostCount} today-post>오늘의 글</Count>
            <Count count={postCount} all-post>지금까지의 글</Count>

            <div className={cx('button-wrapper')}>
                <Button to='/'>제안하기</Button>
                <Button to='/' theme='green'>구독하기</Button>
            </div>    
        </div>

        <div className={cx('menu')}>
            {
                current === "search"
                    ? <div className={cx('search-result')}>검색결과</div>
                    : [<Link to='/' key="intro" className={cx('intro', current === 'intro' && 'current')} >블로그 소개</Link>,
                       <Link to='/list' key="list" className={cx('list', current === 'list' && 'current')}>글 {postCount}</Link>,
                       <Link to='/series/list' key="series" className={cx('series', current === 'series'&& 'current')}>시리즈 {seriesCount}</Link>]
            }
        </div>
    </div>
)

export default Info;