import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
//import reducer from "./reducers";

const enhancer = composeWithDevTools(applyMiddleware(thunk));
//const store = createStore(reducer, enhancer);
const store = createStore(function () {}, enhancer);
export const persistor = persistStore(store);
export default store;
