import React, { Component } from 'react';
import styles from './EditorTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class EditorTemplate extends Component{

    state = {
        leftPercentage : 0.5
    }

    handleMouseMove = (e) => {
        this.setState({
            leftPercentage : e.clientX / window.innerWidth
        })
    }

    handleMouseUp = () => {
        document.body.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseDown = () => {
        document.body.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    render(){
        const { handleMouseDown } = this;
        const { toolbar, editor, preview } = this.props;
        const { leftPercentage } = this.state;

        const leftStyle = {
            flex : leftPercentage
        }

        const rightStyle = {
            flex : 1 - leftPercentage
        }

        const separatorStyle = {
            left : `${leftPercentage * 100}%`
        }

        return(
            <div className={cx('editor-template')}>
                {toolbar}
                <div className={cx('panes')}>
                    <div className={cx('pane', 'editor')} style={leftStyle}>
                        {editor}
                    </div>
                    <div className={cx('pane', 'preview')} style={rightStyle}>
                        {preview}                        
                    </div>
                    <div className={cx('separator')}
                         style={separatorStyle}
                         onMouseDown={handleMouseDown} />
                </div>
            </div>
        )
    }
}

export default EditorTemplate;