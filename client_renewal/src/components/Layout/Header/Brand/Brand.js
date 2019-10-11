import React from 'react';
import classNames from 'classnames';
import styles from './Brand.scss';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Brand = ({ inverse }) => {
	const sidebarOpen = () => {
		document.querySelector('.sidebar').classList.add('sidebar--open');
	};

	return (
		<div className={cx(`brand ${inverse ? 'inverse' : ''}`)}>
			<FaBars size={25} className={cx('sidebar-icon')} onClick={sidebarOpen} />
			<Link className={cx('home')} to="/">
				Minz Log.<span>beta</span>
			</Link>
		</div>
	);
};

Brand.propTypes = {
	inverse: PropTypes.bool
};

Brand.defaultProps = {
	inverse: PropTypes.false
};

export default Brand;
