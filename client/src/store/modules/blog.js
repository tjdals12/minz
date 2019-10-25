import { Map, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_BLOG = 'blog/GET_BLOG';
const EDIT_BLOG = 'blog/EDIT_BLOG';
const ON_CHANGE = 'blog/ON_CHANGE';

export const getBlog = createAction(GET_BLOG, api.getBlog);
export const editBlog = createAction(EDIT_BLOG, api.editBlog);
export const onChange = createAction(ON_CHANGE);

const initialState = Map({
	info: Map({}),
	edit: Map({
		title: '',
		name: '',
		description: '',
		info: '',
		tags: ''
	})
});

export default handleActions(
	{
		...pender({
			type: GET_BLOG,
			onSuccess: (state, action) => {
				const { data: blog } = action.payload.data;

				return state
					.set('info', fromJS(blog))
					.setIn([ 'edit', 'title' ], blog.title)
					.setIn([ 'edit', 'name' ], blog.name)
					.setIn([ 'edit', 'description' ], blog.description)
					.setIn([ 'edit', 'info' ], blog.info)
					.setIn([ 'edit', 'tags' ], blog.tags.join(','));
			}
		}),
		...pender({
			type: EDIT_BLOG,
			onSuccess: (state, action) => {
				const { data: blog } = action.payload.data;

				return state
					.set('info', fromJS(blog))
					.setIn([ 'edit', 'title' ], blog.title)
					.setIn([ 'edit', 'name' ], blog.name)
					.setIn([ 'edit', 'description' ], blog.description)
					.setIn([ 'edit', 'info' ], blog.info)
					.setIn([ 'edit', 'tags' ], blog.tags.join(','));
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { target, name, value } = action.payload;

			return target ? state.setIn([ target, name ], value) : state.set(name, value);
		}
	},
	initialState
);
