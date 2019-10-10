import React from 'react';
import styles from './SeriesInfo.scss';
import classNames from 'classnames/bind';
import Content from 'components/common/Content';
import Tag from 'components/common/Tag';
import Button from 'components/common/Button';
import FaAsterisk from 'react-icons/lib/fa/asterisk';
import moment from 'moment';

const cx = classNames.bind(styles);

const SeriesInfo = ({ username, name, description, writer, keyword, count, dispGb, finishGb, publishedDate, onShowModal, onToggleSeries }) => {

        return(
                <div className={cx('series-information')}>
                        {
                                username === writer && 
                                <div className={cx('button-wrapper')}>
                                        <Button theme='small' onClick={() => onToggleSeries(dispGb)}>{dispGb === "01" ? "비공개" : "공개"}</Button>
                                        <Button theme='small' onClick={onShowModal}>수정</Button>
                                </div>
                        }
                        

                        <Content
                        title={name}
                        description={description}
                        type="series-info"/>

                        <div className={cx('series-summary')}>
                                <span><FaAsterisk /> 총 {count}편</span>
                                <span><FaAsterisk /> {finishGb === "01" ? "연재 중" : dispGb === "02" ? "완결" : "개정"}</span>
                                <span><FaAsterisk /> {dispGb === "01" ? "공개" : "비공개" }</span>
                        </div>

                        <div className={cx('bottom-wrapper')}>
                                <div className={cx('tags')}>
                                        {       
                                                (keyword && typeof keyword === "object")
                                                ? 
                                                keyword.map(
                                                        keyword => (<Tag key={keyword} to={`/search/${keyword}`}>{keyword}</Tag>)
                                                )
                                                :
                                                typeof keyword === "string"
                                                &&
                                                keyword.split(',').map(
                                                        keyword => (<Tag key={keyword} to={`/search/${keyword}`}>{keyword}</Tag>)
                                                ) 
                                                
                                        }
                                </div>
                                <div className={cx('date')}>{moment(publishedDate).format('LLL')}</div>
                        </div>
                </div>
        )
}

export default SeriesInfo;