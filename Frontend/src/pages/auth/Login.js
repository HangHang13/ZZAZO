import React, { useEffect, useRef, useState } from "react";
import Checkbox from "../../components/common/inputs/Checkbox";
import { ColWrapper, Wrapper } from "./../../components/styled/Wrapper";
import { useNavigate } from "react-router-dom";
import AuthButton from "./../../components/common/buttons/AuthButton";
import { login } from "../../api/AuthAPI";
import { getUser } from "../../api/MyPageAPI";
import Header from "./../../components/layout/Header";
import { AuthInput, AuthWrapper, LogoImage, Option, OptionBorder, Options } from "./../../components/styled/Auth";
import { useDispatch, useSelector } from "react-redux";
import { storeLogin, storeLogout } from "../../store/reducers/user";
import Loading from "./../../components/common/Loading";

const Login = () => {
	// States
	const [state, setState] = useState({
		userEmail: "",
		password: "",
	});
	const [check, setCheck] = useState({
		autoLogin: false,
		idSave: false,
	});
	const [loading, setLoading] = useState(false);

	// Navigate, Ref
	const navigate = useNavigate();
	const idRef = useRef();
	const pwRef = useRef();

	// Dispatch
	const dispatch = useDispatch();

	// Selector
	const userData = useSelector((state) => state.user.value);

	// Effect
	useEffect(() => {
		if (userData.isLogin) {
			if (confirm("이미 로그인중입니다. 강제로 로그아웃 하시겠습니까?")) {
				onHandleLogOut();
			}
			return;
		}

		if (sessionStorage.getItem("ACCESS_TOKEN")) {
			sessionStorage.removeItem("ACCESS_TOKEN");
			sessionStorage.removeItem("REFRESH_TOKEN");
			return;
		}

		const loginId = sessionStorage.getItem("LOGIN_ID");
		if (loginId) {
			setState({ ...state, userEmail: loginId });
		}
	}, []);

	const onHandleLogOut = () => {
		dispatch(storeLogout());
		navigate("/");
	};

	const onHandleInput = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const onCheckHandler = (e) => {
		const n = e.target.name;
		setCheck({ ...check, [n]: !check.n });
	};

	const handleOnKeyPress = (e) => {
		if (e.key === "Enter") {
			LoginSubmit();
		}
	};

	// 로그인 폼 제출 시
	const LoginSubmit = async () => {
		if (state.userEmail.length < 1) {
			alert("아이디를 입력해주세요.");
			idRef.current.focus();
			return;
		}
		if (state.password.length < 1) {
			alert("비밀번호를 입력해주세요.");
			pwRef.current.focus();
			return;
		}

		setLoading(true);
		const response = await login(state);
		setLoading(false);

		if (response.status === 200) {
			alert("로그인에 성공했습니다!");
		} else if (response.status === 400) {
			alert("유효한 아이디 형태(이메일)을 입력해주세요.");
			return;
		} else if (response.status === 404) {
			alert("아이디 또는 비밀번호가 틀렸습니다.");
			return;
		} else {
			alert("로그인 시도 중 오류가 발생했습니다. 네트워크 상태를 확인해주세요.");
		}

		// 아이디 저장 체크했을 경우
		if (check.idSave) {
			sessionStorage.setItem("LOGIN_ID", state.userEmail);
		} else {
			sessionStorage.removeItem("LOGIN_ID");
		}

		// 자동 로그인 체크했을 경우
		sessionStorage.setItem("AUTO_LOGIN", check.autoLogin);

		// 토큰 두 가지 sessionStorage에 저장
		const accessToken = response.data.token.access;
		const refreshToken = response.data.token.refresh;
		sessionStorage.setItem("ACCESS_TOKEN", accessToken);
		sessionStorage.setItem("REFRESH_TOKEN", refreshToken);

		// 회원 본인 정보 조회 api 요청
		const userData = await getUser();

		// 받아온 데이터를 밑에 dispatch -> data에 저장
		dispatch(storeLogin({ isLogin: true, data: userData }));

		// 메인 페이지로 이동
		navigate("/");
	};

	return (
		<>
			<Header />
			<Wrapper>
				{loading ? <Loading /> : null}
				<ColWrapper>
					<AuthWrapper>
						<LogoImage src="/assets/logo.png" />
						<AuthInput
							name="userEmail"
							value={state.userEmail}
							width="80%"
							height="52px"
							placeholder="아이디"
							onChange={onHandleInput}
							onKeyPress={handleOnKeyPress}
							ref={idRef}
						/>
						<AuthInput
							name="password"
							value={state.password}
							width="80%"
							height="52px"
							placeholder="비밀번호"
							type="password"
							onChange={onHandleInput}
							onKeyPress={handleOnKeyPress}
							ref={pwRef}
						/>
						<Options>
							<Checkbox text="자동 로그인" tagName="autoLogin" onCheckHandler={onCheckHandler} />
							<Checkbox text="아이디 저장" tagName="idSave" onCheckHandler={onCheckHandler} />
						</Options>
						<AuthButton message="로 그 인" clickEvent={LoginSubmit} />
					</AuthWrapper>
					<Options>
						<Option onClick={() => navigate("/findid")}>아이디 찾기</Option>
						<OptionBorder />
						<Option onClick={() => navigate("/findpw")}>비밀번호 찾기</Option>
						<OptionBorder />
						<Option onClick={() => navigate("/signup")}>회원가입</Option>
					</Options>
				</ColWrapper>
			</Wrapper>
		</>
	);
};

export default Login;
