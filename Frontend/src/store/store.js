import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import userReducer from "./reducers/user";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

//const enhancer = composeWithDevTools(applyMiddleware(thunk));

const reducers = combineReducers({
	user: userReducer,
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
