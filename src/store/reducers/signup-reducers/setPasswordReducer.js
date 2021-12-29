import { SET_TEXT } from '../../actions/actionsTypes';

const setPasswordReducer = (state = '', action) => {
  switch (action.type) {
    case SET_TEXT:
      return action.payload ;
    default:
      return state;
  }
};

export default setPasswordReducer;