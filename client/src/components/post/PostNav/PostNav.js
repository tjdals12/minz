import React from 'react';
import styles from './PostNav.scss';
import classNames from 'classnames/bind';
import MdKeyboardArrowLeft from 'react-icons/lib/md/keyboard-arrow-left';
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right';
import Loading from 'components/common/Loading';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const cx = classNames.bind(styles);

const PostNav = ({ id, title, isNext, onPrev, onNext, loading }) => (
    <div className={cx('post-nav')}>
        {/* {
            loading ?
                <Loading type='cylon' theme='navigation'/> : 
                
        } */}
            <div className={cx('nav')}>
                <div className={cx('prev-post')} onClick={onPrev}>
                    <MdKeyboardArrowLeft />
                </div>

                <CSSTransition
                    in={!loading}
                    timeout={300}
                    classNames={'navigation'}>
                    <div className={cx('preview')}>
                        <h1>
                            {
                                !isNext ? title : <Link to={`/post/${id}`}>{title}</Link>
                            }
                        </h1>
                    </div>
                </CSSTransition>

                <div className={cx('next-post')} onClick={onNext}>
                    <MdKeyboardArrowRight />
                </div>
            </div>
    </div>
)

export default PostNav;