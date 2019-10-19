import React from 'react';
import classNames from 'classnames';
import styles from './PreviewPane.scss';
import { MarkdownRender } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const EditorPreview = ({ title, markdown }) => (
	<div className={cx('preview-pane')}>
		<h1 className={cx('title')}>{title}</h1>
		<div>
			<MarkdownRender markdown={markdown} />
		</div>
	</div>
);

EditorPreview.propTypes = {
	title: PropTypes.string,
	markdown: PropTypes.string
};

export default EditorPreview;
