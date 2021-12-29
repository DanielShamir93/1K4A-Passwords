import emailReducer from "./signup-reducers/emailReducer";
import passwordReducer from "./signup-reducers/passwordReducer";
import confirmReducer from "./signup-reducers/confirmReducer";
import isAuthReducer from "./signup-reducers/isAuthReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    email: emailReducer,
    password: passwordReducer,
    confirm: confirmReducer,
    isAuth: isAuthReducer
})

export default rootReducer;