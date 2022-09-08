import { useEffect } from "react";
import { Provider } from "react-redux";
import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import store, { persistor } from "./store/store";
import MyPage from "./pages/mypage/MyPage";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

function App() {
  //useEffect(async () => {}, []);

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
