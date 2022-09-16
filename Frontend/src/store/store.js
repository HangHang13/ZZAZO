import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import userReducer from "./reducers/user";

//const enhancer = composeWithDevTools(applyMiddleware(thunk));
//const store = createStore(reducer, enhancer);
//const store = createStore(function () { }, enhancer);

const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

// export const persistor = persistStore(store);
export default store;
