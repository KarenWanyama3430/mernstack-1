import axios from "axios";
import {
  GET_ERRORS,
  GET_POST,
  ADD_POST,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";

//add a post
export const addPost = newPost => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", newPost)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get all posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

//set post loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

//delete post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//add like to a post
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//remove like from a post
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get a single post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
        payload: null
      });
    });
};

//add a comment to a post
export const addComment = (postID, newComment) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postID}`, newComment)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//delete a comment from a post
export const deleteComment = (postID, commentID) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postID}/${commentID}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
