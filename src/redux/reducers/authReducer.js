import * as actionTypes from '../actions/actionTypes';

const initialState = { token: null, user: null, prechecksRan: false };

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.ADD_USER:
			return { ...state, user: action.user };
		case actionTypes.REMOVE_USER:
			return { ...state, user: null };
		case actionTypes.PRECHECKS_RAN:
			return { ...state, prechecksRan: true };

		default:
			return state;
	}
}
