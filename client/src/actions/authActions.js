import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//register a user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login a user
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //set token to localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      //pass it to headers
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      //set to current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//set logged out user
export const logoutUser = () => dispatch => {
  //clear the token from the local storage
  localStorage.removeItem("jwtToken");
  //clear the token from the headers
  setAuthToken(false);
  //set current user to {} which will set aothorization to false
  dispatch(setCurrentUser({}));
};
