import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Wrapper, MobileSizeWrapper, InputWrapper, ButtonWrapper, InputFullWrapper } from "./../../components/styled/Wrapper";
import { BaseForm } from "../../components/common/forms/Form";
import InputCheckButton from "./../../components/common/buttons/InputCheckButton";
import { useNavigate } from "react-router-dom";
import NumberCircle from "./../../components/auth/NumberCircle";
import { ProgressBlock, ProgressDescription, SignupBody, SignupHeader } from "../../components/auth/signup/Signup";
import { emailConfirm, emailDuplicateCheck, emailSendConfirm, nickNameDuplicateCheck } from "../../api/AuthAPI";
import Header from "./../../components/layout/Header";
import Button from "./../../components/common/buttons/Button";
import { HeaderSpace } from "./../../components/styled/HeaderSpace";

const InputBlock = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
`;

const InputTag = styled.div`
	margin-top: 2rem;
	@media screen and (max-width: 500px) {
		font-size: 0.9rem;
	}
`;

const AlertTag = styled.div`
	display: ${({ display }) => display};
	color: ${({ color }) => color};
	font-size: 0.8rem;
`;

const BirthSelectBox = styled.select`
	width: 30%;
	height: 52px;
	background-color: white;
	border-radius: 8px;
	border: 1px solid #d0d0d0;
	text-align: center;
	font-size: 0.9rem;
`;

const Signup = () => {
	const [state, setState] = useState({
		userEmail: "",
		userEmailCode: "",
		password: "",
		password2: "",
		userName: "",
		userNickName: "",
		userPhone: "",
		userBirth: "",
		userGender: "M",
		userCategory: [],
		userEmailChecked: false,
		userEmailConfirmed: false,
		passwordChecked: false,
		userNickNameChecked: false,
	});

	const [valid, setValid] = useState({
		passwordNotValid: false,
		passwordNotMatch: false,
	});

	const [birthDate, setBirthDate] = useState({
		year: "2022",
		month: "01",
		day: "01",
	});

	const emailConfirmRef = useRef([]);
	const passwordRef = useRef([]);

	const navigate = useNavigate();

	// input 창 입력 시 이벤트
	const onHandleInput = (e) => {
		if (e.target.name === "userEmail") setState({ ...state, ["userEmailChecked"]: false });
		setState({ ...state, [e.target.name]: e.target.value });
	};

	// 이메일 중복 체크
	const onHandleEmailDuplicateCheck = async (e) => {
		e.preventDefault();
		if (state.userEmailChecked) {
			alert("중복 확인이 완료된 이메일입니다.");
			return;
		}
		if (state.userEmail.length < 1) {
			alert("이메일을 입력해주세요.");
			return;
		}

		const response = await emailDuplicateCheck(state.userEmail);

		if (response.code === 200) {
			const finish = confirm("사용 가능한 이메일입니다. 이 이메일로 가입을 진행하시겠습니까?");
			if (finish) {
				alert("입력한 이메일로 인증번호를 전송했습니다. 전송받은 인증번호를 입력해주세요.");
				sendConfirmEmail();
				setState({ ...state, ["userEmailChecked"]: true });
				emailConfirmRef.current[0].disabled = true;
				emailConfirmRef.current[0].style.backgroundColor = "#f0f0f0";
				emailConfirmRef.current[1].disabled = false;
				emailConfirmRef.current[1].style.backgroundColor = "#ffffff";
			}
		} else if (response.code === 401) {
			alert("이미 가입된 이메일입니다.");
		} else {
			alert("오류가 발생했습니다.");
		}
	};

	// 이메일 인증 번호 발송
	const sendConfirmEmail = async () => {
		const response = await emailSendConfirm(state.userEmail);
		console.log(response);
	};

	// 이메일 인증
	const onHandleEmailConfirm = async (e) => {
		e.preventDefault();
		if (!state.userEmailChecked) {
			alert("중복 체크를 먼저 해 주세요.");
			return;
		}

		const response = await emailConfirm(state.userEmailCode);
		console.log(response);

		if (response.code === 200) {
			alert("이메일 인증이 완료되었습니다.");
			setState({ ...state, ["userEmailConfirmed"]: true });
			emailConfirmRef.current[1].disabled = true;
			emailConfirmRef.current[1].style.backgroundColor = "#f0f0f0";
		} else {
			alert("인증 번호가 잘못되었습니다. 다시 입력해주세요.");
		}
	};

	// 비밀번호 유효성 체크
	const userPwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/i;
	const userPwCheck = (e) => {
		onHandleInput(e);

		if (!userPwRegex.test(state.password)) {
			setValid({ ...valid, passwordNotMatch: false });
			setValid({ ...valid, passwordNotValid: true });
		} else {
			setValid({ ...valid, passwordNotMatch: false });
			setValid({ ...valid, passwordNotValid: false });
		}
	};

	// 비밀번호, 비밀번호재입력 일치 체크
	const userPwMatch = (e) => {
		onHandleInput(e);

		if (state.password !== state.password2) {
			setValid({ ...valid, passwordNotValid: false });
			setValid({ ...valid, passwordNotMatch: true });
		} else {
			setValid({ ...valid, passwordNotValid: false });
			setValid({ ...valid, passwordNotMatch: false });
		}
	};

	// 닉네임 중복 체크
	const onHandleNickNameDuplicateCheck = async (e) => {
		e.preventDefault();
		if (state.userNickNameChecked) {
			alert("중복 확인이 완료된 닉네임입니다.");
			return;
		}
		if (state.userNickName.length < 1) {
			alert("닉네임을 입력해주세요.");
			return;
		}

		const response = await nickNameDuplicateCheck(state.userNickName);

		if (response.code === 200) {
			const finish = confirm("사용 가능한 닉네임입니다. 이 닉네임으로 가입을 진행하시겠습니까?");
			if (finish) {
				setState({ ...state, ["userNickNameChecked"]: true });
				emailConfirmRef.current[2].disabled = true;
				emailConfirmRef.current[2].style.backgroundColor = "#f0f0f0";
			}
		} else if (response.code === 401) {
			alert(response.message);
		} else {
			alert("오류가 발생했습니다.");
		}
	};

	// 성별 변경
	const changeGender = (val) => {
		setState({ ...state, userGender: val });
	};

	// 최종 폼 제출
	const submitState = () => {
		// 이메일 인증 여부 확인
		if (!state.userEmailChecked || !state.userEmailConfirmed) {
			alert("아이디를 다시 확인해주세요.");
			return;
		}
		// 비밀번호 : 길이 8이상, notmatch랑 notvalid 모두 아닌가 확인
		if (state.password.length < 8 || state.password2.length < 8 || valid.passwordNotMatch || valid.passwordNotValid) {
			alert("비밀번호를 다시 확인해주세요.");
			return;
		}
		// 이름 : 길이 체크
		if (state.userName.length < 1 || state.userName.length > 12) {
			alert("이름은 1글자 이상 12글자 이하여야 합니다.");
			return;
		}
		// 이름 : 유효성 체크
		const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
		if (!nameRegex.test(state.userName)) {
			alert("이름을 올바르게 입력해주세요.");
			return;
		}
		// 닉네임 : 길이 체크
		if (state.userNickName.length < 1 || state.userName.length > 12) {
			alert("닉네임은 1글자 이상 12글자 이하여야 합니다.");
			return;
		}
		if (!state.userNickNameChecked) {
			// 닉네임 : 중복 확인 여부
			alert("닉네임 중복 확인을 해주세요.");
			return;
		}
		// 휴대폰번호
		const phoneRegex = /^[0-9]+$/;
		if (!phoneRegex.test(state.userPhone)) {
			alert("휴대폰 번호를 올바르게 입력해주세요.");
			return;
		}

		// 제출
		navigate("/signupinterests", { state: state });
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		setState({
			...state,
			userBirth: birthDate.year + "-" + birthDate.month + "-" + birthDate.day,
		});
	}, [birthDate]);

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
			<HeaderSpace height="12rem" />
			<Wrapper>
				<MobileSizeWrapper>
					<SignupHeader>
						<ProgressBlock>
							<NumberCircle color="#C0F0B0" number="1" />
							<ProgressDescription>회원정보 입력</ProgressDescription>
						</ProgressBlock>
						<ProgressBlock>
							<NumberCircle color="#D0D0D0" number="2" />
							<ProgressDescription>관심정보 입력</ProgressDescription>
						</ProgressBlock>
					</SignupHeader>
					<SignupBody>
						<InputTag>아이디 (이메일)</InputTag>
						<BaseForm onSubmit={onHandleEmailDuplicateCheck}>
							<InputBlock>
								<InputWrapper
									name="userEmail"
									type="email"
									value={state.userEmail}
									placeholder="user@example.com"
									onChange={onHandleInput}
									ref={(el) => (emailConfirmRef.current[0] = el)}
									width="270px"
								/>
								<InputCheckButton message="중복 확인" />
							</InputBlock>
						</BaseForm>
						<BaseForm onSubmit={onHandleEmailConfirm}>
							<InputBlock>
								<InputWrapper
									name="userEmailCode"
									value={state.userEmailCode}
									placeholder="이메일 인증 번호"
									onChange={onHandleInput}
									disabled
									bg="#f0f0f0"
									ref={(el) => (emailConfirmRef.current[1] = el)}
									width="270px"
								/>
								<InputCheckButton message="이메일 인증" />
							</InputBlock>
						</BaseForm>
						<InputTag>비밀번호</InputTag>
						<InputBlock>
							<InputFullWrapper
								name="password"
								type="password"
								value={state.password}
								placeholder="영문+숫자+특수문자 포함 8~12자"
								onChange={userPwCheck}
								onKeyUp={userPwCheck}
								ref={(el) => (passwordRef.current[0] = el)}
							/>
						</InputBlock>
						<InputBlock>
							<InputFullWrapper
								name="password2"
								type="password"
								value={state.password2}
								placeholder="비밀번호 재입력"
								onChange={userPwMatch}
								onKeyUp={userPwMatch}
								ref={(el) => (passwordRef.current[1] = el)}
							/>
						</InputBlock>
						{valid.passwordNotValid ? <AlertTag color="red">사용할 수 없는 비밀번호입니다.</AlertTag> : <AlertTag></AlertTag>}
						{valid.passwordNotMatch ? <AlertTag color="red">비밀번호가 일치하지 않습니다.</AlertTag> : <AlertTag></AlertTag>}
						{state.passwordChecked ? <AlertTag color="green">사용할 수 있는 비밀번호입니다.</AlertTag> : <AlertTag></AlertTag>}
						<InputTag>이름</InputTag>
						<InputBlock>
							<InputFullWrapper
								name="userName"
								type="text"
								value={state.userName}
								placeholder="이름을 입력해주세요."
								onChange={onHandleInput}
								width="100%"
							/>
						</InputBlock>
						<InputTag>닉네임</InputTag>
						<BaseForm onSubmit={onHandleNickNameDuplicateCheck}>
							<InputBlock>
								<InputWrapper
									name="userNickName"
									type="text"
									value={state.userNickname}
									placeholder="닉네임을 입력해주세요."
									onChange={onHandleInput}
									ref={(el) => (emailConfirmRef.current[2] = el)}
									width="270px"
								/>
								<InputCheckButton message="중복 확인" />
							</InputBlock>
						</BaseForm>
						<InputTag>생년월일</InputTag>
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
						<InputTag>성별</InputTag>
						<InputBlock>
							<Button
								message="남"
								value="M"
								width="45%"
								bg={state.userGender === "M" ? "#c0f0b0" : "#ffffff"}
								borderColor={state.userGender === "M" ? "#80e080" : "#767676"}
								clickEvent={() => changeGender("M")}
							/>
							<Button
								message="여"
								value="F"
								width="45%"
								bg={state.userGender === "F" ? "#c0f0b0" : "#ffffff"}
								borderColor={state.userGender === "F" ? "#80e080" : "#767676"}
								clickEvent={() => changeGender("F")}
							/>
						</InputBlock>
						<InputTag>휴대폰 번호</InputTag>
						<InputBlock>
							<InputFullWrapper
								name="userPhone"
								type="text"
								value={state.userPhone}
								placeholder="휴대폰 번호를 입력해주세요. (ex. 01012341234)"
								onChange={onHandleInput}
								width="100%"
							/>
						</InputBlock>
						<InputTag></InputTag>
						<Button message="다 음" width="100%" borderColor="#80E080" color="#80C0A0" clickEvent={() => submitState()}></Button>
					</SignupBody>
				</MobileSizeWrapper>
			</Wrapper>
		</>
	);
};

export default Signup;
