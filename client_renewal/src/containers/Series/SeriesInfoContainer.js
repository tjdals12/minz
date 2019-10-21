import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import SeriesInfo from 'components/Series/SeriesInfo';
import { useSelector, useDispatch } from 'react-redux';
import { getSeries } from 'store/modules/series';

const SeriesInfoContainer = ({ match }) => {
	const { writer, name, description, post, finishGb, dispGb, keyword, publishedDate } = useSelector(
		(state) => state.series.get('series').toJS(),
		[]
	);
	const username = useSelector((state) => state.auth.getIn([ 'userInfo', 'profile', 'username' ]), []);
	const dispatch = useDispatch();

	useEffect(
		() => {
			const { seq } = match.params;
			dispatch(getSeries(seq));
		},
		[ match, dispatch ]
	);

	return (
		<SeriesInfo
			username={username}
			writer={writer}
			name={name}
			description={description}
			post={post}
			finishGb={finishGb}
			dispGb={dispGb}
			keyword={keyword}
			publishedDate={publishedDate}
		/>
	);
};

export default withRouter(SeriesInfoContainer);
