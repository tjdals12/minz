import React from 'react';
import classNames from 'classnames';
import styles from './MySites.scss';
import { Button } from 'components/common';
import { FaClipboard, FaGithub } from 'react-icons/fa';

const cx = classNames.bind(styles);

const MySites = () => (
	<div className={cx('website')}>
		<h2 className={cx('title')}>웹사이트</h2>
		<div className={cx('wrapper')}>
			<div className={cx('site-wrapper')}>
				<Button theme="icon">
					<FaClipboard />
				</Button>
			</div>

			<div className={cx('button-wrapper')}>
				<Button onClick={() => window.open('https://github.com/tjdals12')}>
					<FaGithub size={15} /> Github
				</Button>
			</div>
		</div>
	</div>
);

export default MySites;
