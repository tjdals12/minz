import React from 'react';
import classNames from 'classnames';
import styles from './Search.scss';
import { FaSearch } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Search = ({ onSearch }) => {
	const [ searchBar, setSearchBar ] = React.useState(false);

	const onToggleSearchBar = () => {
		setSearchBar(!searchBar);
	};

	return (
		<div className={cx('search')}>
			<CSSTransition in={searchBar} timeout={300} classNames="searchBar">
				<input
					name="keyword"
					className={cx('keyword')}
					placeholder="포스트"
					onKeyDown={(e) => {
						if (e.keyCode === 13) onSearch(e.target.value);
					}}
				/>
			</CSSTransition>
			<span className={cx('search-icon')} onClick={onToggleSearchBar}>
				<FaSearch size={25} />
			</span>
		</div>
	);
};

Search.propTypes = {
	onSearch: PropTypes.func
};

Search.defaultProps = {
	onSearch: () => console.warn('Warning: onSearch is not defined')
};

export default Search;
