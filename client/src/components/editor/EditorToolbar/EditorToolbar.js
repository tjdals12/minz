import React from 'react';
import styles from './EditorToolbar.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
import TiPen from 'react-icons/lib/ti/pen';
import TiEdit from 'react-icons/lib/ti/edit';
import TiBackspaceOutline from 'react-icons/lib/ti/backspace-outline';
import TiAttachmentOutline from 'react-icons/lib/ti/attachment-outline';
import TiDownloadOutline from 'react-icons/lib/ti/download-outline';

const cx = classNames.bind(styles);

const EditorToolbar = ({ onGoBack, onSubmit, onUpload, isEdit }) => (
    <div className={cx('editor-header')}>
        <div className={cx('submit', 'tool')}>
            {
                isEdit ?
                <Button onClick={onSubmit} theme='editor'><TiEdit /></Button> :
                <Button onClick={onSubmit} theme='editor'><TiPen /></Button>
            }
        </div>
        <div className={cx('submit', 'tool')}>
            <Button onClick={onGoBack} theme='editor'><TiDownloadOutline /></Button>
        </div>
        <div className={cx('attach', 'tool')}>
            <Button theme='editor'>
                <input type="file" id="imgUploader" name="imgUploader" onChange={(e) => {onUpload(e.target.files[0])}}/>
                <TiAttachmentOutline />
            </Button>
        </div> 
        <div className={cx('back', 'tool')}>
            <Button onClick={onGoBack} theme='editor warning'><TiBackspaceOutline /></Button>
        </div> 
    </div>
)

export default EditorToolbar;