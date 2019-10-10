import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const TRANSITION_STYLE = 'style/TRANSITION_STYLE';

export const transitionStyle = createAction(TRANSITION_STYLE);

const initialState = Map({
    target : Map({
        side: false
    })
})

export default handleActions({
    [TRANSITION_STYLE] : (state, action) => {
        const { target } = action.payload;
        return state.setIn(['target', target], true);
    }
}, initialState);