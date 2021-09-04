import {
  GET_ALL_POSTS,
  GET_POST,
  POST_ERROR,
  ADD_LIKE,
  REMOVE_LIKE,
  REMOVE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/Types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: null,
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POSTS:
      return { ...state, posts: payload, loading: false, error: null };
    case GET_POST:
      return { ...state, post: payload, loading: false, error: null };
    case POST_ERROR:
      return { ...state, loading: false, error: payload };
    case ADD_LIKE:
    case REMOVE_LIKE:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p._id === payload.id ? { ...p, likes: payload.likes } : p
        ),
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts],
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case ADD_COMMENT:
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
        },
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
