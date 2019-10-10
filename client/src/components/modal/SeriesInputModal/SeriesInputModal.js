import React, { Component } from 'react';
import styles from './SeriesInputModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Thumbnail from 'components/common/Thumbnail';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class SeriesInputModal extends Component{
    handleChange = (e) => {
        const { name, value } = e.target;
        const { onChangeInput } = this.props;

        onChangeInput({name, value});
    }

    render(){
        const { writer, thumb, seq, name, description, keyword, onSeries, onSeriesUpdate, onUpload, onHideModal, visible } = this.props;
        const { handleChange } = this;

        return(
            <ModalWrapper visible={visible}>
                <div className={cx('series-input')}>
                    <div className={cx('series-thumb')}>
                        <label htmlFor="thumb" className={cx('thumb-upload')}>
                            <Thumbnail url={thumb} type="series" className={cx('upload-thumb')}/>
                        </label>
                        
                        <input type="file" name="thumb" id="thumb" className={cx('thumb-input')} onChange={(e) => {onUpload(e.target.files[0])}}/>
                    </div>
                    <div className={cx('series-desc')}>
                        <div className={cx('input-wrapper')}>
                            <input name="name" className={cx('title')} placeholder="시리즈 제목" value={name} onChange={handleChange}/>
                            <textarea
                                name="description"
                                className={cx('description')}
                                placeholder="이 시리즈에 대한 간략한 설명을 입력해주세요. 어떤 독자들을 위한 시리즈인지 입력해도 좋을거 같아요 ^^"
                                value={description}
                                onChange={handleChange} />
                            <input name="keyword" className={cx('keyword')} placeholder="키워드, 구성요소 (콤마로 구분)" value={keyword} onChange={handleChange}/>
                        </div>

                        <div className={cx('author-count')}>
                            <p className={cx('author-name')}>writer. {writer}</p>
                        </div>
                    </div>

                    <div className={cx('button-wrapper')}>
                        <Button theme='small' onClick={onHideModal}>취소</Button> 
                        {
                            seq
                            ? <Button theme='small' onClick={onSeriesUpdate}>수정</Button>
                            : <Button theme='small' onClick={onSeries}>연재 시작</Button>
                        }                   
                        
                    </div>
                </div>
            </ModalWrapper>
        )
    }
}

export default SeriesInputModal;
