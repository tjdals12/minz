import React from 'react';
import classNames from 'classnames';
import styles from './SeriesToolbar.scss';
import { Wrapper, ButtonWrapper, Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const SeriesToolbar = ({ isLogin, onOpen }) => (
	<Wrapper className={cx('series-toolbar')}>
		<ButtonWrapper className={cx('buttons')}>
			{isLogin && (
				<Button theme="small" onClick={() => onOpen('seriesCreate')}>
					등록
				</Button>
			)}
		</ButtonWrapper>
	</Wrapper>
);

SeriesToolbar.propTypes = {
	isLogin: PropTypes.bool,
	onOpen: PropTypes.func
};

SeriesToolbar.defaultProps = {
	isLogin: false,
	onOpen: () => console.warn('WarningL onOpen is not defined')
};

export default SeriesToolbar;
