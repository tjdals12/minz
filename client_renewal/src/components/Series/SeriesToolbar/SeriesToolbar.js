import React from 'react';
import classNames from 'classnames';
import styles from './SeriesToolbar.scss';
import { Wrapper, ButtonWrapper, Button } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const SeriesToolbar = ({ onOpen }) => (
	<Wrapper className={cx('series-toolbar')}>
		<ButtonWrapper className={cx('buttons')}>
			<Button theme="small" onClick={() => onOpen('seriesCreate')}>
				등록
			</Button>
		</ButtonWrapper>
	</Wrapper>
);

SeriesToolbar.propTypes = {
	onOpen: PropTypes.func
};

SeriesToolbar.defaultProps = {
	onOpen: () => console.warn('WarningL onOpen is not defined')
};

export default SeriesToolbar;
