import React, { useEffect } from "react";
import AuthButton from "../../../components/common/buttons/AuthButton";
import Header from "../../../components/layout/Header";
import { AuthWrapper, FindGuide, FindTitle, LogoImage } from "../../../components/styled/Auth";
import { ColWrapper, Wrapper } from "../../../components/styled/Wrapper";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./../../../components/common/buttons/Button";

const FindIdResult = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	const moveHome = () => {
		navigate("/");
	};

	useEffect(() => {
		console.log(state);
		if (state === null) {
			alert("비정상적인 접근입니다.");
			navigate("/");
		}
	}, []);

	return (
		<>
			<Header />
			<Wrapper>
				<ColWrapper>
					<AuthWrapper border="0">
						<LogoImage src="/assets/logo.png" />
						<FindTitle>아이디 찾기</FindTitle>
						<FindGuide>입력한 정보로 가입된 계정은 아래와 같습니다.</FindGuide>
						<AuthWrapper>{state !== null ? state.userEmail : ""}</AuthWrapper>
						<Button message="확 인" width="80%" color="white" bg="#80E080" borderColor="#80C0A0" clickEvent={moveHome}></Button>
					</AuthWrapper>
				</ColWrapper>
			</Wrapper>
		</>
	);
};

export default FindIdResult;
