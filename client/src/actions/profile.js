import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_USER } from './Types';
import { setAlert } from './alert';
export const getCurrentUserProfile = () => async (dispatch) => {
	try {
		const apiEndpoint = `/api/profile/me`;
		const res = await axios.get(apiEndpoint);
		dispatch({ type: GET_PROFILE, payload: res.data });
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status,
			},
		});
		dispatch(setAlert());
	}
};

export const createProfile =
	(formData, history, edit = false) =>
	async (dispatch) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const res = await axios.post('api/profile', formData, config);
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
			dispatch(
				setAlert(edit ? 'Profile updated' : 'Profile created', 'success')
			);
			if (!edit) {
				history.push('/dashboard');
			}
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: {
					msg: err.response.data.statusText,
					status: err.response.data.status,
				},
			});
		}
	};

export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.put('api/profile/experience', formData, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Experience added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.data.statusText,
				status: err.response.data.status,
			},
		});
	}
};

export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.put('api/profile/education', formData, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Education added', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
