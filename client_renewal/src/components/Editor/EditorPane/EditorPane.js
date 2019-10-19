import React, { Component } from 'react';
import styles from './EditorPane.scss';
import classNames from 'classnames/bind';
import codeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

class EditorPane extends Component {
	editor = null;
	codeMirror = null;
	cursor = null;

	initializeEditor = () => {
		this.codeMirror = codeMirror(this.editor, {
			mode: 'markdown',
			theme: 'monokai',
			lineNumbers: true,
			lineWrapping: true
		});
		this.codeMirror.on('change', this.handleChangeMarkdown);
	};

	componentDidMount() {
		this.initializeEditor();
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		const { onChange } = this.props;

		onChange({ name, value });
	};

	handleChangeMarkdown = (doc) => {
		const { onChange } = this.props;
		this.cursor = doc.getCursor();

		onChange({
			name: 'markdown',
			value: doc.getValue()
		});
	};

	componentDidUpdate(prevProps, prevState) {
		// markdown이 변경되면 에디터 값도 변경합니다.
		// 이 과정에서 텍스트 커서의 위치가 초기화되기 때문에,
		// 저장한 커서의 위치가 있으면 해당 위치로 설정합니다.
		if (prevProps.markdown !== this.props.markdown) {
			const { codeMirror, cursor } = this;
			if (!codeMirror) return; // 인스턴스를 아직 만들지 않았을 때
			codeMirror.setValue(this.props.markdown);
			if (!cursor) return; // 커서가 없을 때
			codeMirror.setCursor(cursor);
		}
	}

	render() {
		const { handleChange } = this;
		const { title, tags } = this.props;

		return (
			<div className={cx('editor-pane')}>
				<input
					name="title"
					className={cx('title')}
					placeholder="제목을 입력해주세요."
					value={title}
					onChange={handleChange}
				/>
				<div className={cx('code-mirror')} ref={(ref) => (this.editor = ref)} />
				<div className={cx('tags')}>
					<div className={cx('description')}>태그</div>
					<input name="tags" placeholder="태그를 입력해주세요. (쉼표로 구분)" value={tags} onChange={handleChange} />
				</div>
			</div>
		);
	}
}

EditorPane.propTypes = {
	title: PropTypes.string,
	markdown: PropTypes.string,
	tags: PropTypes.string,
	onChange: PropTypes.func
};

EditorPane.defaultProps = {
	onChange: () => console.warn('Warning: onChange is not defined')
};

export default EditorPane;
