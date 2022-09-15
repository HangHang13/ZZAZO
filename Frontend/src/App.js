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
import NotFound from "./pages/error/NotFound";
import UpdateProfile from "./pages/mypage/UpdateProfile";
import UpdatePassword from "./pages/mypage/UpdatePassword";
import DeleteProfile from "./pages/mypage/DeleteProfile";
import Scedule from "./pages/scedule/Scedule";
import Navbar from "./components/layout/Navbar";
import SignupInterests from "./pages/auth/SignupInterests";
import FindIdMain from "./pages/auth/find/FindIdMain";
import FindPwMain from "./pages/auth/find/FindPwMain";

function App() {
  //useEffect(async () => {}, []);

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />}>
              <Route index element={<UpdateProfile />} />
              <Route path="update/profile" element={<UpdateProfile />} />
              <Route path="update/password" element={<UpdatePassword />} />
              <Route path="delete/profile" element={<DeleteProfile />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signupinterests" element={<SignupInterests />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findid" element={<FindIdMain />} />
            <Route path="/findpw" element={<FindPwMain />} />
            <Route path="/scedule" element={<Scedule />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
