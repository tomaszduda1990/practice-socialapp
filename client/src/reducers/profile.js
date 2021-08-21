import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/Types';
const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

const profile = (state = initialState, { type = '', payload = {} }) => {
	switch (type) {
		case GET_PROFILE:
			return { ...state, profile: payload, loading: false, error: {} };
		case PROFILE_ERROR:
			return { ...state, error: payload, loading: false };

		case CLEAR_PROFILE:
			return { ...state, profile: null, loading: false, repos: [] };
		default:
			return state;
	}
};

export default profile;
