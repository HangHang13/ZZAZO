import React from "react";
// import ReactDOM from "react-dom/client"; // react 18
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Provider } from "react-redux";

const persistor = persistStore(store);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
// 	<React.StrictMode>
// 		<Provider store={store}>
// 			<PersistGate loading={null} persistor={persistor}>
// 				<App />
// 			</PersistGate>
// 		</Provider>
// 	</React.StrictMode>
// );
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
//curryyou.tistory.com/468 [카레유:티스토리]

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
출처: https: reportWebVitals();
