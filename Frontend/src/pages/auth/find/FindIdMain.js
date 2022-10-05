import React, { useState, useRef, useEffect } from "react";
import { ColWrapper } from "../../../components/styled/Wrapper";
import { AuthInput, AuthWrapper, BirthSelectBox, FindGuide, FindTitle, InputBlock, LogoImage } from "./../../../components/styled/Auth";
import Header from "../../../components/layout/Header";
import { Wrapper } from "./../../../components/styled/Wrapper";
import AuthButton from "../../../components/common/buttons/AuthButton";
import { useNavigate } from "react-router-dom";
import { findId } from "../../../api/AuthAPI";

const FindIdMain = () => {
	const [state, setState] = useState({
		userName: "",
		userPhone: "",
		userBirth: "",
	});

	const [birthDate, setBirthDate] = useState({
		year: "2022",
		month: "01",
		day: "01",
	});

	const navigate = useNavigate();

	const nameRef = useRef();
	const phoneRef = useRef();

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
		if (state.userName.length < 1) {
			alert("이름을 입력해주세요.");
			nameRef.current.focus();
			return;
		}
		if (state.userPhone.length < 1) {
			alert("휴대폰 번호를 입력해주세요.");
			phoneRef.current.focus();
			return;
		}

		const response = await findId(state);
		if (response.data.code === 200) {
			navigate("/findid/result", {
				state: {
					code: 200,
					userEmails: response.data.userEmails,
				},
			});
		} else if (response.data.code === 401) {
			alert("일치하는 회원 정보가 없습니다.");
			return;
		} else {
			alert("오류가 발생했습니다.");
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
						<FindTitle>아이디 찾기</FindTitle>
						<FindGuide>가입할 때 입력하셨던 이름, 휴대폰 번호, 생년월일을 입력해주세요.</FindGuide>

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

						<AuthInput
							name="userPhone"
							value={state.userPhone}
							width="80%"
							height="52px"
							placeholder="휴대폰 번호"
							onChange={onHandleInput}
							onKeyPress={handleOnKeyPress}
							ref={phoneRef}
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
						<AuthButton message="아이디 찾기" clickEvent={onSubmit}></AuthButton>
					</AuthWrapper>
				</ColWrapper>
			</Wrapper>
		</>
	);
};

export default FindIdMain;
