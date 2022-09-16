import React, { useState, useRef } from "react";
import styled from "styled-components";
import { SignupBody } from "../../components/auth/signup/Signup";
import DivButton from "../../components/common/buttons/DivButton";
import { ButtonWrapper, InputWrapper } from "../../components/styled/Wrapper";
import InputCheckButton from "./../../components/common/buttons/InputCheckButton";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  @media screen and (max-width: 500px) {
    margin-left: 25%;
  }
`;

const InputTag = styled.div`
  margin-top: 2rem;
`;
const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const UpdatePassword = () => {
  const [state, setState] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [valid, setValid] = useState({
    passwordNotDuplicate: false,
    passwordNotValid: false,
    passwordNotMatch: false,
  });
  const passwordRef = useRef([]);
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const AlertTag = styled.div`
    display: ${({ display }) => display};
    color: ${({ color }) => color};
    font-size: 0.8rem;
  `;
  //비밀번호 유효성 체크
  const userPwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/i;
  const userPwCheck = (e) => {
    onHandleInput(e);

    if (!userPwRegex.test(state.newPassword)) {
      // setValid({ ...valid, passwordNotMatch: false });
      setValid({ ...valid, passwordNotValid: true });
    } else {
      // setValid({ ...valid, passwordNotMatch: false });
      setValid({ ...valid, passwordNotValid: false });
    }
  };
  const userPwMatch = (e) => {
    onHandleInput(e);
    if (state.newPassword !== state.confirmPassword) {
      // setValid({ ...valid, passwordNotValid: false });
      setValid({ ...valid, passwordNotMatch: true });
    } else {
      // setValid({ ...valid, passwordNotValid: false });
      setValid({ ...valid, passwordNotMatch: false });
    }
  };
  const submitState = async () => {
    if (!confirm("비밀번호를 변경하시겠습니까?")) {
      return;
    }
    const response = {
      code: 200,
    };
    if (response.code === 200) {
      alert("비밀번호가 변경되었습니다.");
      console.log(state.confirmPassword);
    } else {
      alert("비밀번호 변경에 실패하였습니다.");
      console.log(state.confirmPassword);
    }
  };
  return (
    <>
      <Body>
        <SignupBody>
          <InputTag></InputTag>
          <InputTag></InputTag>
          <InputTag>새 비밀번호</InputTag>
          <InputBlock>
            <InputWrapper
              name="newPassword"
              type="password"
              value={state.newPassword}
              placeholder="영문+숫자+특수문자 포함 8~12자"
              onChange={userPwCheck}
              onKeyUp={userPwCheck}
              ref={(el) => (passwordRef.current[0] = el)}
            />
          </InputBlock>
          {valid.passwordNotValid ? (
            <AlertTag color="red">사용할 수 없는 비밀번호입니다.</AlertTag>
          ) : (
            <AlertTag></AlertTag>
          )}
          <InputTag></InputTag>
          <InputTag></InputTag>
          <InputTag>새 비밀번호 확인</InputTag>
          <InputBlock>
            <InputWrapper
              name="confirmPassword"
              type="password"
              value={state.confirmPassword}
              placeholder="비밀번호 재입력"
              onChange={userPwMatch}
              onKeyUp={userPwMatch}
              ref={(el) => (passwordRef.current[1] = el)}
            />
          </InputBlock>

          {valid.passwordNotMatch ? (
            <AlertTag color="red">비밀번호가 일치하지 않습니다.</AlertTag>
          ) : (
            <AlertTag></AlertTag>
          )}
          <InputTag></InputTag>
          <InputTag></InputTag>
          <InputCheckButton
            message="저장"
            width="100%"
            borderColor="#80E080"
            color="#80C0A0"
            clickEvent={() => submitState()}
          ></InputCheckButton>
        </SignupBody>
      </Body>
    </>
  );
};

export default UpdatePassword;
