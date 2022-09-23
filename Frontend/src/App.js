import "./App.css";
import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import MyPage from "./pages/mypage/MyPage";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import NotFound from "./pages/error/NotFound";
import UpdateProfile from "./pages/mypage/UpdateProfile";
import UpdatePassword from "./pages/mypage/UpdatePassword";
import DeleteProfile from "./pages/mypage/DeleteProfile";
import SignupInterests from "./pages/auth/SignupInterests";
import FindIdMain from "./pages/auth/find/FindIdMain";
import FindPwMain from "./pages/auth/find/FindPwMain";
import Plan from "./pages/plan/Plan";
import FindIdResult from "./pages/auth/find/FindIdResult";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect } from "react";
import { storeLogout } from "./store/reducers/user";
import PlanMakeCard from "./pages/plan/PlanMakeCard";
import { TransitionGroup } from "react-transition-group";

function App() {
	// const location = useLocation();

	const onHandleLogOut = () => {
		dispatch(storeLogout());
		navigate("/");
	};

	const onHandleBrowserClose = (e) => {
		e.preventDefault();
		onHandleLogOut();
	};

	useEffect(() => {
		(() => {
			window.addEventListener("beforeunload", onHandleBrowserClose);
		})();
		return () => {
			window.removeEventListener("beforeunload", onHandleBrowserClose);
		};
	}, []);

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/mypage" element={<PrivateRoute component={<MyPage />} />}>
						<Route index element={<UpdateProfile />} />
						<Route path="update/profile" element={<UpdateProfile />} />
						<Route path="update/password" element={<UpdatePassword />} />
						<Route path="delete/profile" element={<DeleteProfile />} />
					</Route>
					<Route path="/signup" element={<Signup />} />
					<Route path="/signupinterests" element={<SignupInterests />} />
					<Route path="/login" element={<Login />} />
					<Route path="/findid" element={<FindIdMain />} />
					<Route path="/findid/result" element={<FindIdResult />} />
					<Route path="/findpw" element={<FindPwMain />} />
					<Route path="/plan" element={<PrivateRoute component={<Plan />} />} />
					<Route path="/planmakecard" element={<PrivateRoute component={<PlanMakeCard />} />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
