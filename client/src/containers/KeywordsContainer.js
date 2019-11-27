import React from 'react';
import Tags from 'components/Tags';
import { useSelector } from 'react-redux';

const KeywordsContainer = () => {
    const keywords = useSelector(state => state.series.get('keywords').toJS(), []);

    return (
        <Tags tags={keywords} />
    )
}

export default KeywordsContainer;