import axios from "axios";
import {
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_USER,
  GET_ALL_PROFILES,
  //   GET_REPOS,
} from "./Types";
import setAlert from "./alert";

export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const apiEndpoint = `/api/profile/me`;
    const res = await axios.get(apiEndpoint);
    dispatch({ type: GET_PROFILE, payload: res.data.profile });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const apiEndpoint = `/api/profile`;
    const res = await axios.get(apiEndpoint);
    dispatch({ type: GET_ALL_PROFILES, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const getProfileById = (id) => async (dispatch) => {
  try {
    const apiEndpoint = `/api/profile/user/${id}`;
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
  }
};

// const getGithubProfiles = (username) => async (dispatch) => {
//   try {
//     const res = await axios.get(`/api/github/${username}`);
//     dispatch({ type: GET_REPOS, payload: res.data.profile });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: {
//         msg: err.response.statusText,
//         status: err.response.status,
//       },
//     });
//   }
// };

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile updated" : "Profile created", "success")
      );
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const { errors } = err.response.data;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
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
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("api/profile/experience", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
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
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("api/profile/education", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    dispatch(setAlert("Experience removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
    dispatch(setAlert("Education removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Please confirm DELETING your account")) {
    try {
      await axios.delete(`/api/profile/delete`);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACCOUNT,
      });
      dispatch(setAlert("Account succesfully removed"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
