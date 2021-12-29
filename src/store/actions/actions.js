import { SET_TEXT } from './actionsTypes';

export const setTextAction = (text) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_TEXT,
      payload: text
    })
  }
};
