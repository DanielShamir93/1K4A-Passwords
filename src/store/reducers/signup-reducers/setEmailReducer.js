import { SET_TEXT } from '../../actions/actionsTypes';

const setEmailReducer = (state = '', action) => {
  switch (action.type) {
    case SET_TEXT:
      return action.payload ;
    default:
      return state;
  }
};

export default setEmailReducer;