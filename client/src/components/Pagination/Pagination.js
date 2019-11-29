import React from 'react';
import classNames from 'classnames';
import styles from './Pagination.scss';
import PropTypes from 'prop-types';
import { Wrapper, Button } from 'components/common';

const cx = classNames.bind(styles);

const Pagination = ({ page, lastPage, onPage }) => {
	return (page === lastPage || lastPage <= 0) ? null : (
		<Wrapper className={cx('pagination')}>
			<Button className={cx('w-100')} theme="green" onClick={() => onPage(page + 1)}>
				더보기
			</Button>
		</Wrapper>
	);
};

Pagination.propTypes = {
	page: PropTypes.number,
	lastPage: PropTypes.number,
	onPage: PropTypes.func
};

Pagination.defaultProps = {
	page: 1,
	lastPage: 1,
	onPage: () => console.warn('Warning: onPage is not defined')
};

export default Pagination;
