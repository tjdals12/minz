import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import SeriesInfo from 'components/Series/SeriesInfo';
import { useSelector, useDispatch } from 'react-redux';
import { getSeries, toggleDispGb } from 'store/modules/series';
import { open } from 'store/modules/modal';

const SeriesInfoContainer = ({ match }) => {
	const { seq, writer, name, description, post, finishGb, dispGb, keyword, publishedDate } = useSelector(
		(state) => state.series.get('series').toJS(),
		[]
	);
	const username = useSelector((state) => state.auth.getIn([ 'userInfo', 'profile', 'username' ]), []);
	const dispatch = useDispatch();

	const handleToggle = useCallback(
		() => {
			dispatch(toggleDispGb(seq));
		},
		[ seq, dispatch ]
	);

	const handleOpen = useCallback(
		(name) => {
			dispatch(open(name));
		},
		[ dispatch ]
	);

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
			onToggle={handleToggle}
			onOpen={handleOpen}
		/>
	);
};

export default withRouter(SeriesInfoContainer);
