import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findPw } from "../../../api/AuthAPI";
import AuthButton from "../../../components/common/buttons/AuthButton";
import Header from "../../../components/layout/Header";
import { AuthInput, AuthWrapper, BirthSelectBox, FindGuide, FindTitle, InputBlock, LogoImage } from "../../../components/styled/Auth";
import { ColWrapper, Wrapper } from "../../../components/styled/Wrapper";

const FindPwMain = () => {
	const [state, setState] = useState({
		userEmail: "",
		userName: "",
		userBirth: "",
	});

	const [birthDate, setBirthDate] = useState({
		year: "2022",
		month: "01",
		day: "01",
	});

	const navigate = useNavigate();

	const emailRef = useRef();
	const nameRef = useRef();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		setState({
			...state,
			userBirth: birthDate.year + "-" + birthDate.month + "-" + birthDate.day,
		});
	}, [birthDate]);

	const onHandleInput = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const handleOnKeyPress = (e) => {
		if (e.key === "Enter") {
			onSubmit();
		}
	};

	const onSubmit = async () => {
		console.log(state);
		if (state.userEmail.length < 1) {
			alert("아이디를 입력해주세요.");
			emailRef.current.focus();
			return;
		}
		if (state.userName.length < 1) {
			alert("이름을 입력해주세요.");
			nameRef.current.focus();
			return;
		}

		const response = await findPw(state);

		console.log(response);
		if (response.code === 200) {
			alert(state.userEmail + " 로 재설정된 비밀번호를 발송했습니다. 해당 비밀번호로 로그인 후 비밀번호 변경 바랍니다.");
			navigate("/login");
		} else {
			alert("일치하는 회원정보가 없거나, 오류가 발생했습니다.");
			return;
		}
	};

	/* 날짜 구하는 부분 시작 */
	const now = new Date();

	let years = [];
	for (let y = now.getFullYear(); y >= 1930; y -= 1) {
		years.push(y);
	}

	let month = [];
	for (let m = 1; m <= 12; m += 1) {
		if (m < 10) {
			// 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
			month.push("0" + m.toString());
		} else {
			month.push(m.toString());
		}
	}
	let days = [];
	let date = new Date(birthDate.year, birthDate.month, 0).getDate();
	for (let d = 1; d <= date; d += 1) {
		if (d < 10) {
			// 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
			days.push("0" + d.toString());
		} else {
			days.push(d.toString());
		}
	}
	/* 날짜 구하는 부분 끝 */

	return (
		<>
			<Header />
			<Wrapper>
				<ColWrapper>
					<AuthWrapper border="0">
						<LogoImage src="/assets/logo.png" />
						<FindTitle>비밀번호 찾기</FindTitle>
						<FindGuide>가입할 때 입력하셨던 아이디(이메일 주소)로 새 비밀번호를 발송합니다.</FindGuide>

						<AuthInput
							name="userEmail"
							value={state.userEmail}
							width="80%"
							height="52px"
							placeholder="아이디"
							onChange={onHandleInput}
							onKeyPress={handleOnKeyPress}
							ref={emailRef}
						/>
						<AuthInput
							name="userName"
							value={state.userName}
							width="80%"
							height="52px"
							placeholder="이름"
							onChange={onHandleInput}
							onKeyPress={handleOnKeyPress}
							ref={nameRef}
						/>
						<InputBlock>
							<BirthSelectBox
								value={birthDate.year}
								onChange={(e) => {
									setBirthDate({ ...birthDate, year: e.target.value });
								}}
							>
								{years.map((item) => (
									<option value={item} key={item}>
										{item}
									</option>
								))}
							</BirthSelectBox>
							<BirthSelectBox
								value={birthDate.month}
								onChange={(e) => {
									setBirthDate({ ...birthDate, month: e.target.value });
								}}
							>
								{month.map((item) => (
									<option value={item} key={item}>
										{item}
									</option>
								))}
							</BirthSelectBox>
							<BirthSelectBox
								value={birthDate.day}
								onChange={(e) => {
									setBirthDate({ ...birthDate, day: e.target.value });
								}}
							>
								{days.map((item) => (
									<option value={item} key={item}>
										{item}
									</option>
								))}
							</BirthSelectBox>
						</InputBlock>
						<AuthButton message="비밀번호 찾기" clickEvent={onSubmit} />
					</AuthWrapper>
				</ColWrapper>
			</Wrapper>
		</>
	);
};

export default FindPwMain;
