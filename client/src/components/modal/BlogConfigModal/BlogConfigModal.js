import React from 'react';
import classNames from 'classnames';
import styles from './BlogConfigModal.scss';
import ModalWrapper from 'components/modal/ModalWrapper';
import { ButtonWrapper, Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const BlogConfigModal = ({ info, visible, onUpload, onChange, onSubmit, onClose }) => (
	<ModalWrapper visible={visible}>
		<div className={cx('blog-config-modal')}>
			<div className={cx('input-wrapper')}>
				<p className={cx('label')}>대문 이미지</p>
				<div className={cx('blog-input', 'file-input')}>
					<input
						type="file"
						name="background"
						className={cx('file-input')}
						onChange={(e) => {
							onUpload(e.target.name, e.target.files[0]);
						}}
					/>
				</div>
				<p className={cx('label')}>대문 타이틀</p>
				<input type="text" name="title" className={cx('blog-input')} value={info.title} onChange={onChange} />
				<p className={cx('label')}>썸네일 이미지</p>
				<div className={cx('blog-input', 'file-input')}>
					<input
						type="file"
						name="thumbnail"
						className={cx('file-input')}
						onChange={(e) => {
							onUpload(e.target.name, e.target.files[0]);
						}}
					/>
				</div>
				<p className={cx('label')}>관리자 이름</p>
				<input type="text" name="name" className={cx('blog-input')} value={info.name} onChange={onChange} />
				<p className={cx('label')}>관리자 설명</p>
				<input
					type="text"
					name="description"
					className={cx('blog-input')}
					value={info.description}
					onChange={onChange}
				/>
				<p className={cx('label')}>블로그 설명</p>
				<textarea
					name="info"
					className={cx('blog-input', 'blog-textarea')}
					value={info.info}
					onChange={onChange}
				/>
				<p className={cx('label')}>태그</p>
				<input type="text" name="tags" value={info.tags} className={cx('blog-input')} onChange={onChange} />
			</div>

			<ButtonWrapper>
				<Button theme="small" onClick={onSubmit}>
					저장
				</Button>
				<Button theme="small" onClick={() => onClose('blogConfig')}>
					취소
				</Button>
			</ButtonWrapper>
		</div>
	</ModalWrapper>
);

BlogConfigModal.propTypes = {
	visible: PropTypes.bool,
	onUpload: PropTypes.func,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	onClose: PropTypes.func
};

BlogConfigModal.defaultProps = {
	visible: false,
	onUpload: () => console.warn('Warning: onUpload is not defined'),
	onChange: () => console.warn('Warning: onChange is not defined'),
	onSubmit: () => console.warn('Warning: onClose is not defined'),
	onClose: () => console.warn('Warning: onClose is not defined')
};

export default BlogConfigModal;
