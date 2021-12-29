import { SET_EMAIL, SET_PASSWORD, SET_CONFIRM, IS_AUTH } from './actionsTypes';

export const setEmailAction = (email = '') => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_EMAIL,
      payload: email
    })
  }
};

export const setPasswordAction = (password = '') => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_PASSWORD,
      payload: password
    })
  }
};

export const setConfirmAction = (confirm = '') => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_CONFIRM,
      payload: confirm
    })
  }
};

export const isAuthAction = (isAuth = false) => {
  return (dispatch, getState) => {
    dispatch({
      type: IS_AUTH,
      payload: isAuth
    })
  }
}