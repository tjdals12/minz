import React from 'react';
import classNames from 'classnames';
import styles from './EditorToolbar.scss';
import { Button } from 'components/common';
import { TiEdit, TiPen, TiDownloadOutline, TiBackspaceOutline, TiAttachmentOutline } from 'react-icons/ti';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const EditorToolbar = ({ onGoBack, onSubmit, onUpload, isEdit }) => (
	<div className={cx('editor-header')}>
		<div className={cx('submit', 'tool')}>
			{isEdit ? (
				<Button onClick={onSubmit} theme="editor">
					<TiEdit />
				</Button>
			) : (
				<Button onClick={onSubmit} theme="editor">
					<TiPen />
				</Button>
			)}
		</div>
		<div className={cx('submit', 'tool')}>
			<Button onClick={onGoBack} theme="editor">
				<TiDownloadOutline />
			</Button>
		</div>
		<div className={cx('attach', 'tool')}>
			<Button theme="editor">
				<input
					type="file"
					id="imgUploader"
					name="imgUploader"
					onChange={(e) => {
						onUpload(e.target.files[0]);
					}}
				/>
				<TiAttachmentOutline />
			</Button>
		</div>
		<div className={cx('back', 'tool')}>
			<Button onClick={onGoBack} theme="editor warning">
				<TiBackspaceOutline />
			</Button>
		</div>
	</div>
);

EditorToolbar.propTypes = {
	isEdit: PropTypes.bool,
	onGoBack: PropTypes.func,
	onSubmit: PropTypes.func,
	onUpload: PropTypes.func
};

EditorToolbar.defaultProps = {
	isEdit: false,
	onGoBack: () => console.warn('Warning: onGoBack is not defined'),
	onSubmit: () => console.warn('Warning: onGoBack is not defined'),
	onUpload: () => console.warn('Warning: onGoBack is not defined')
};

export default EditorToolbar;
