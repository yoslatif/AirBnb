// frontend/src/store/session.js
import { csrfFetch } from './csrf';


// Action Types
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_ERROR = 'session/setError';


// Action Creators
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const setError = (error) => {
    return {
      type: SET_ERROR,
      payload: error
    };
  };
  

// Thunks
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
    return null;
  }
  else {
    const errorData = await response.json();
    dispatch(setError(errorData.error));
  }
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

// Reducer
const initialState = { user: null, error: null };


const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default sessionReducer;
