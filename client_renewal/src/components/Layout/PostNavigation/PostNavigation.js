import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './PostNavigation.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const PostNavigation = ({ id, title, isNext, onPrev, onNext, loading }) => (
	<div className={cx('post-navigation')}>
		<MdKeyboardArrowLeft size={25} className={cx('direction prev')} onClick={onPrev} />

		<CSSTransition in={!loading} timeout={300} classNames={'navigation'}>
			<div className={cx('preview')}>
				<Link to={`/post/${id}`}>{title}</Link>
			</div>
		</CSSTransition>

		<MdKeyboardArrowRight className={cx('direction next')} onClick={onNext} />
	</div>
);

PostNavigation.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	isNext: PropTypes.bool,
	onPrev: PropTypes.func,
	onNext: PropTypes.func,
	loading: PropTypes.bool
};

PostNavigation.defaultProps = {
	title:
		'Phasellus ac velit at quam interdum sagittis ut at felis. Nulla eget pharetra purus. Maecenas vel suscipit ante. Mauris mollis est id felis interdum elementum non non sapien. Donec dignissim placerat faucibus. Vestibulum facilisis odio vel eros fermentum, vel rutrum neque tristique. Ut sollicitudin, libero ut malesuada dapibus, magna mi tincidunt turpis, sed laoreet nulla nibh eu dolor. Sed a mollis dui. Phasellus consectetur suscipit lectus quis ultrices. Pellentesque egestas ullamcorper quam, eget iaculis diam laoreet at.',
	isNext: false,
	onPrev: () => console.warn('Warning: onPrev is not defined'),
	onNext: () => console.warn('Warning: onNext is not defined'),
	loading: false
};

export default PostNavigation;
