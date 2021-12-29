import { SET_TEXT } from '../../actions/actionsTypes';

const setConfirmReducer = (state = '', action) => {
  switch (action.type) {
    case SET_TEXT:
      return action.payload ;
    default:
      return state;
  }
};

export default setConfirmReducer;