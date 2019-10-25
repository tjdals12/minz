import React, { useState, useCallback, useEffect } from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';
import marked from 'marked';
import Prismjs from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
// 지원할 코드 형식들을 불러옵니다.
// http://prismjs.com/#languages-list 참조
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-css.min.js';

const cx = classNames.bind(styles);

const MarkdownRender = ({ markdown }) => {
	const [ html, setHtml ] = useState('');

	const markdownRender = useCallback(
		() => {
			if (!markdown) {
				setHtml('');
				return;
			}

			setHtml(marked(markdown, { breaks: true }));
		},
		[ markdown ]
	);

	useEffect(
		() => {
			markdownRender();
		},
		[ markdown, markdownRender ]
	);

	useEffect(
		() => {
			Prismjs.highlightAll();
		},
		[ html ]
	);

	return <div className={cx('markdown-render')} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default MarkdownRender;
