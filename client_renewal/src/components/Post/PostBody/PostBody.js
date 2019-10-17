import React from 'react';
import classNames from 'classnames';
import styles from './PostBody.scss';
import { MarkdownRender, Wrapper } from 'components/common';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const PostBody = ({ body }) => (
	<Wrapper className={cx('post-body')}>
		<MarkdownRender markdown={body} />
	</Wrapper>
);

PostBody.propTypes = {
	body: PropTypes.string
};

PostBody.defaultProps = {
	body: ''
};

export default PostBody;
