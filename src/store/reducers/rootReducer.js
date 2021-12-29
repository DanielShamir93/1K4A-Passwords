import setEmailReducer from "./signup-reducers/setEmailReducer";
import setPasswordReducer from "./signup-reducers/setPasswordReducer";
import setConfirmReducer from "./signup-reducers/setConfrimReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    setEmail: setEmailReducer,
    setPassword: setPasswordReducer,
    setConfirm: setConfirmReducer
})

export default rootReducer;