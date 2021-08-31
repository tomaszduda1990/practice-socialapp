import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_USER,
  GET_ALL_PROFILES,
  GET_REPOS,
} from "../actions/Types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profile = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
        error: {},
      };
    case UPDATE_USER:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {},
      };
    case GET_REPOS:
      return {
        ...state,
        repos: [...payload],
        loading: false,
        error: {},
      };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false, profile: null };

    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false, repos: [] };
    default:
      return state;
  }
};

export default profile;
