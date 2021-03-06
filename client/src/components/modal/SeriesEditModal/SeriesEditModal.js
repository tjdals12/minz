import React from 'react';
import classNames from 'classnames';
import styles from './SeriesEditModal.scss';
import ModalWrapper from 'components/modal/ModalWrapper';
import { Thumbnail, ButtonWrapper, Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const SeriesEditModal = ({
	visible,
	thumbnail,
	name,
	description,
	keyword,
	writer,
	onUpload,
	onChange,
	onClose,
	onEdit
}) => (
	<ModalWrapper visible={visible}>
		<div className={cx('series-modal')}>
			<div className={cx('series-thumb')}>
				<label htmlFor="thumb" className={cx('thumb-upload')}>
					<Thumbnail url={thumbnail} type="series" />
				</label>

				<input
					type="file"
					name="thumb"
					id="thumb"
					className={cx('thumb-input')}
					onChange={(e) => {
						onUpload(e.target.files[0]);
					}}
				/>

				<p className={cx('thumb-alert')}>jpg, png 파일만 가능</p>
			</div>

			<div className={cx('series-desc')}>
				<div className={cx('input-wrapper')}>
					<input name="name" className={cx('title')} placeholder="시리즈 제목" value={name} onChange={onChange} />
					<textarea
						name="description"
						className={cx('description')}
						placeholder="이 시리즈에 대한 간략한 설명을 입력해주세요."
						value={description}
						onChange={onChange}
					/>
					<input
						name="keyword"
						className={cx('keyword')}
						placeholder="키워드 (콤마로 구분)"
						value={keyword}
						onChange={onChange}
					/>
				</div>

				<p className={cx('author')}>writer. {writer}</p>
			</div>

			<ButtonWrapper>
				<Button theme="small" onClick={() => onClose('seriesEdit')}>
					취소
				</Button>
				<Button theme="small" onClick={onEdit}>
					수정
				</Button>
			</ButtonWrapper>
		</div>
	</ModalWrapper>
);

SeriesEditModal.propTypes = {
	visible: PropTypes.bool,
	thumbnail: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
	keyword: PropTypes.string,
	writer: PropTypes.string,
	onUpload: PropTypes.func,
	onChange: PropTypes.func,
	onClose: PropTypes.func,
	onEdit: PropTypes.func
};

SeriesEditModal.defaultProps = {
	visible: false,
	onUpload: () => console.warn('Warning: onUpload is not defined'),
	onChange: () => console.warn('Warning: onChange is not defined'),
	onClose: () => console.warn('Warning: onClose is not defined'),
	onEdit: () => console.warn('Warning: onEdit is not defined')
};

export default SeriesEditModal;
