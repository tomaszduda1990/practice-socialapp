import axios from "axios";
import setAlert from "./alert";
import { loadUser } from "./auth";
import {
  GET_ALL_POSTS,
  POST_ERROR,
  GET_POST,
  ADD_LIKE,
  ADD_POST,
  REMOVE_LIKE,
  REMOVE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./Types";

export const getAllPosts = () => async (dispatch) => {
  try {
    loadUser();
    const res = await axios.get("/api/posts");
    dispatch({
      type: GET_ALL_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    setAlert(error.response.data.msg, "danger");
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    setAlert(error.response.data.msg, "danger");
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: ADD_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    setAlert(error.response.data.msg, "danger");
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: REMOVE_LIKE,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    setAlert(error.response.data.msg, "danger");
  }
};

export const removePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: REMOVE_POST,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    setAlert(error.response.data.msg, "danger");
  }
};

export const addPost = (post) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/posts/`, post, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
    setAlert(error.response.data.msg, "danger");
  }
};

export const addComment = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/posts/comment/${id}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    setAlert(error.response.msg, "danger");
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    setAlert(error.response.msg, "danger");
  }
};
