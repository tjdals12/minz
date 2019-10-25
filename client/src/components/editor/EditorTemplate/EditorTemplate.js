import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './EditorTemplate.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const EditorTemplate = ({ toolbar, editor, preview }) => {
	const [ leftPercentage, setLeftPercentage ] = useState(0.5);

	const handleMouseMove = (e) => {
		setLeftPercentage(e.clientX / window.innerWidth);
	};

	const handleMouseUp = () => {
		document.body.removeEventListener('mouseup', handleMouseUp);
		window.removeEventListener('mousemove', handleMouseMove);
	};

	const handleMouseDown = () => {
		document.body.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('mousemove', handleMouseMove);
	};

	return (
		<div className={cx('editor-template')}>
			{toolbar}
			<div className={cx('panes')}>
				<div
					className={cx('pane', 'editor')}
					style={{
						flex: leftPercentage
					}}
				>
					{editor}
				</div>
				<div
					className={cx('pane', 'preview')}
					style={{
						flex: 1 - leftPercentage
					}}
				>
					{preview}
				</div>
				<div
					className={cx('separator')}
					style={{
						left: `${leftPercentage * 100}%`
					}}
					onMouseDown={handleMouseDown}
				/>
			</div>
		</div>
	);
};

EditorTemplate.propTypes = {
	toolbar: PropTypes.node,
	editor: PropTypes.node,
	preview: PropTypes.node
};

export default EditorTemplate;
