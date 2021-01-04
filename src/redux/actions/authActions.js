import * as actionTypes from './actionTypes';

export function addUser(user) {
	return { type: actionTypes.ADD_USER, user };
}

export function removeUser() {
	return { type: actionTypes.REMOVE_USER };
}

export function prechecksRan() {
	return { type: actionTypes.PRECHECKS_RAN };
}

export function showHeader() {
	return { type: actionTypes.SHOW_HEADER };
}

export function hideHeader() {
	return { type: actionTypes.HIDE_HEADER };
}
