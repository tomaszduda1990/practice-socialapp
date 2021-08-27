import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_USER,
	LOGIN_FAIL,
	LOGOUT,
	DELETE_ACCOUNT,
} from '../actions/Types';
const initialState = {
	token: localStorage.getItem('socialAppToken'),
	isAuthenticated: null,
	loading: true,
	user: null,
};
const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case REGISTER_SUCCESS:
		case LOGIN_USER:
			localStorage.setItem('socialAppToken', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case LOGIN_FAIL:
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
		case DELETE_ACCOUNT:
			localStorage.removeItem('socialAppToken');
			return {
				...state,
				token: null,
				loading: false,
				isAuthenticated: false,
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
		default:
			return state;
	}
};
export default authReducer;
