import React, { useRef, useState } from "react";
import Checkbox from "../../components/common/inputs/Checkbox";
import { ColWrapper, Wrapper } from "./../../components/styled/Wrapper";
import { useNavigate } from "react-router-dom";
import AuthButton from "./../../components/common/buttons/AuthButton";
import { login } from "../../api/AuthAPI";
import Header from "./../../components/layout/Header";
import { AuthInput, AuthWrapper, LogoImage, Option, OptionBorder, Options } from "./../../components/styled/Auth";

const Login = () => {
	const [state, setState] = useState({
		userEmail: "",
		password: "",
	});

	const [check, setCheck] = useState({
		autoLogin: false,
		idSave: false,
	});

	const navigate = useNavigate();

	const idRef = useRef();
	const pwRef = useRef();

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

		const response = await login(state);

		if (response.code === 200) {
			alert("로그인에 성공했습니다!");
		} else if (response.code === 404) {
			alert(response.message);
			return;
		} else {
			alert("로그인 중 오류가 발생했습니다.");
			return;
		}

		// 로그인 성공 후 do something....
		// 1. dispatch로 user 정보 저장
	};

	return (
		<>
			<Header />
			<Wrapper>
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
