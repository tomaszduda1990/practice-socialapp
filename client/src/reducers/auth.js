import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/Types';
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
			localStorage.setItem('socialAppToken', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
			localStorage.removeItem('socialAppToken');
			return {
				...state,
				token: null,
				loading: false,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};
export default authReducer;
