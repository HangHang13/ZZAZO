import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./reducers/user";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import positionReducer from "./reducers/position";
const reducers = combineReducers({
  user: userReducer,
  position: positionReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export default store;
