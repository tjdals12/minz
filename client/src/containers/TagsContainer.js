import React from 'react';
import Tags from 'components/Tags';
import { useSelector } from 'react-redux';

const TagsContainer = () => {
    const tags = useSelector(state => state.post.get('tags').toJS(), []);
    
    return (
        <Tags tags={tags} />
    )
}

export default TagsContainer;