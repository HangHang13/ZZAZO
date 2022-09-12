import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import session from "redux-persist/lib/storage/session";
import user from "./user";

const persistConfig = {
  key: "uInfo",
  storage: session,
};

const reducer = combineReducers({
  user,
});

export default persistReducer(persistConfig, reducer);
