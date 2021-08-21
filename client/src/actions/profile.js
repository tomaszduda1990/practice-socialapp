import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from './Types';
import { setAlert } from './alert';
export const getCurrentUserProfile = () => async (dispatch) => {
	try {
		const apiEndpoint = `/api/profile/me`;
		const res = await axios.get(apiEndpoint);
		dispatch({ type: GET_PROFILE, payload: res.data });
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
		dispatch(setAlert());
	}
};
