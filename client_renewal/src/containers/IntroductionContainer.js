import React from 'react';
import Introduction from 'components/Introduction';
import { useSelector } from 'react-redux';

const IntroductionContainer = () => {
	const info = useSelector((state) => state.blog.getIn([ 'info', 'info' ]), []);
	const tags = useSelector((state) => state.blog.getIn([ 'info', 'tags' ]), []);
	const loading = useSelector((state) => state.pender.pending['blog/GET_BLOG'], []);

	return loading || loading === undefined ? null : <Introduction info={info} tags={tags.toJS()} />;
};

export default IntroductionContainer;
