import React, { useRef, useState } from "react";
import styled from "styled-components";
import { client } from "./../../utils/client";
import {
  Wrapper,
  MobileSizeWrapper,
  InputWrapper,
  ButtonWrapper,
} from "./../../components/styled/Wrapper";
import { BaseForm } from "../../components/common/Form";

const SignupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  // background-color: beige;
`;

const SignupBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  //background-color: aqua;
`;

const ProgressBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NumberCircle = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  color: white;
  width: 5rem;
  height: 5rem;
  margin-left: 2rem;
  margin-right: 2rem;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
`;

const ProgressDescription = styled.div`
  margin-top: 0.5rem;
  text-align: center;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const InputTag = styled.div`
  margin-top: 1rem;
`;

const Signup = () => {
  const [state, setState] = useState({
    userEmail: "",
    userEmailCode: "",
    userPassword: "",
    userPasswordCheck: "",
    userName: "",
    userNickName: "",
    userPhone: "",
    userBirth: "",
    userGender: 0,
    userCategory: [],
    userRadius: 0,
    userEmailChecked: false,
    userEmailConfirmed: false,
    userNickNameChecked: false,
  });

  const emailConfirmRef = useRef([]);

  // input 창 입력 시 이벤트
  const onHandleInput = (e) => {
    if (e.target.name === "userEmail")
      setState({ ...state, ["userEmailChecked"]: false });
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

    // const response = await client.get(
    //   `/users/checkemail?userEmail=${state.userEmail}`
    // );

    const response = {
      code: 200,
    };

    if (response.code === 200) {
      const finish = confirm(
        "사용 가능한 이메일입니다. 이 이메일로 가입을 진행하시겠습니까?"
      );
      if (finish) {
        alert(
          "입력한 이메일로 인증번호를 전송했습니다. 전송받은 인증번호를 입력해주세요."
        );
        sendConfirmEmail();
        setState({ ...state, ["userEmailChecked"]: true });
        emailConfirmRef.current[0].disabled = true;
        emailConfirmRef.current[0].style.backgroundColor = "#f0f0f0";
        emailConfirmRef.current[1].disabled = false;
        emailConfirmRef.current[1].style.backgroundColor = "#ffffff";
      }
    } else if (response.code === 401) {
      alert(response.message);
    } else {
      alert("오류가 발생했습니다.");
    }
  };

  const sendConfirmEmail = () => {
    console.log("send confirm email!");
  };

  // 이메일 인증
  const onHandleEmailConfirm = (e) => {
    e.preventDefault();
    if (!state.userEmailChecked) {
      alert("중복 체크를 먼저 해 주세요.");
      return;
    }
    if (state.userEmailConfirmed) {
      alert("이메일 인증이 완료되었습니다.");
      return;
    }

    // const response = await client.get(
    //   `/users/??????`
    // );

    const response = {
      code: 200,
    };

    if (response.code === 200) {
      alert("이메일 인증이 완료되었습니다.");
      setState({ ...state, ["userEmailConfirmed"]: true });
      emailConfirmRef.current[1].disabled = true;
      emailConfirmRef.current[1].style.backgroundColor = "#f0f0f0";
    } else {
      alert("인증 번호가 잘못되었습니다. 다시 입력해주세요.");
    }
  };

  // 닉네임 중복 체크
  const onHandleNickNameDuplicateCheck = (e) => {
    e.preventDefault();
    if (state.userNickNameChecked) {
      alert("중복 확인이 완료된 닉네임입니다.");
      return;
    }
    if (state.userNickName.length < 1) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    // const response = await client.get(
    //   `/users/checkemail?userEmail=${state.userEmail}`
    // );

    const response = {
      code: 200,
    };

    if (response.code === 200) {
      const finish = confirm(
        "사용 가능한 닉네임입니다. 이 닉네임으로 가입을 진행하시겠습니까?"
      );
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

  return (
    <Wrapper>
      <MobileSizeWrapper>
        <SignupHeader>
          <ProgressBlock>
            <NumberCircle color="#C0F0B0">1</NumberCircle>
            <ProgressDescription>회원정보 입력</ProgressDescription>
          </ProgressBlock>
          <ProgressBlock>
            <NumberCircle color="#D0D0D0">2</NumberCircle>
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
              />
              <ButtonWrapper>중복 확인</ButtonWrapper>
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
              />
              <ButtonWrapper>이메일 인증</ButtonWrapper>
            </InputBlock>
          </BaseForm>
          <InputTag>비밀번호</InputTag>
          <InputBlock>
            <InputWrapper
              name="userPassword"
              type="password"
              value={state.userPassword}
              placeholder="영문+숫자+특수문자 포함 8~12자"
              onChange={onHandleInput}
              width="100%"
            />
          </InputBlock>
          <InputBlock>
            <InputWrapper
              name="userPasswordCheck"
              type="password"
              value={state.userPasswordCheck}
              placeholder="비밀번호 재입력"
              onChange={onHandleInput}
              width="100%"
            />
          </InputBlock>
          <InputTag>이름</InputTag>
          <InputBlock>
            <InputWrapper
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
              />
              <ButtonWrapper>중복 확인</ButtonWrapper>
            </InputBlock>
          </BaseForm>
        </SignupBody>
      </MobileSizeWrapper>
    </Wrapper>
  );
};

export default Signup;
