import React, { useState, useRef } from "react";
import styled from "styled-components";
import { updatePassword } from "../../api/MyPageAPI";
import { SignupBody } from "../../components/styled/Signup";
import { InputFullWrapper } from "../../components/styled/Wrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const ProfileUpdateBtn = styled.button`
  display: flex;
  margin-top: 2rem;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  color: ${({ color }) => color};
  background-color: ${({ bg }) => bg};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: 1px solid ${({ borderColor }) => borderColor};
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;

  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  transition: all 0.2s ease-in;
  &:hover {
    cursor: pointer;
    background: skyblue;
    border: 1px solid blue;
  }
  &:active {
    background: ${({ activeBackground }) => activeBackground};
    border: 1px solid ${({ borderColor }) => borderColor};
  }
`;

ProfileUpdateBtn.defaultProps = {
  width: "100px",
  height: "52px",
  color: "#000000",
  bg: "#ffffff",
  borderColor: "#767676",
  borderRadius: "8px",
  activeBackground: "rgba(0, 0, 0, 0.5)",
};
const AlertTag = styled.div`
  display: ${({ display }) => display};
  color: ${({ color }) => color};
  font-size: 0.8rem;
`;
const UpdatePassword = () => {
  /**유저 정보 받아오기*/
  const user = useSelector((state) => state.user.value);
  /**비밀번호 변경 후 페이지 이동을 위한 useNavigate*/
  const navigate = useNavigate();
  /**비밀번호 상태관리*/
  const [state, setState] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  /**비밀번호 유효성 검증 관리*/
  const [valid, setValid] = useState({
    passwordNotDuplicate: false,
    passwordNotValid: false,
    passwordNotMatch: false,
  });
  /**비밀번호 입력창 선택관리*/
  const passwordRef = useRef([]);
  /**입력창 값을 통해 비밀번호 상태갱신하는 함수*/
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  /**새 비밀번호 유효성 체크*/
  const userPwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/i;
  /**새 비밀번호 유효성 체크 함수 */
  const userPwCheck = (e) => {
    onHandleInput(e);

    if (!userPwRegex.test(state.newPassword)) {
      setValid({ ...valid, passwordNotValid: true });
    } else {
      setValid({ ...valid, passwordNotValid: false });
    }
  };
  /**새 비밀번호 일치 체크 함수*/
  const userPwMatch = (e) => {
    onHandleInput(e);
    if (state.newPassword !== state.confirmPassword) {
      setValid({ ...valid, passwordNotMatch: true });
    } else {
      setValid({ ...valid, passwordNotMatch: false });
    }
  };
  /**새 비밀번호 업데이트 함수*/
  const submitState = async () => {
    if (!confirm("비밀번호를 변경하시겠습니까?")) {
      return;
    }
    const data = {
      password: state.newPassword,
      password2: state.confirmPassword,
    };
    const result = await updatePassword(data);

    if (result.code === 200) {
      alert("비밀번호가 변경되었습니다.");
    } else {
      alert("비밀번호 변경에 실패하였습니다.");
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
            <InputFullWrapper
              name="newPassword"
              type="password"
              value={state.newPassword}
              placeholder="영문+숫자+특수문자 포함 8~12자"
              onChange={userPwCheck}
              onKeyUp={userPwCheck}
              ref={(el) => (passwordRef.current[0] = el)}
            />
          </InputBlock>
          {/* 새 비밀번호 유효성 경고 */}
          {valid.passwordNotValid ? (
            <AlertTag color="red">사용할 수 없는 비밀번호입니다.</AlertTag>
          ) : (
            <AlertTag></AlertTag>
          )}
          <InputTag></InputTag>
          <InputTag></InputTag>
          <InputTag>새 비밀번호 확인</InputTag>
          <InputBlock>
            <InputFullWrapper
              name="confirmPassword"
              type="password"
              value={state.confirmPassword}
              placeholder="비밀번호 재입력"
              onChange={userPwMatch}
              onKeyUp={userPwMatch}
              ref={(el) => (passwordRef.current[1] = el)}
            />
          </InputBlock>
          {/* 새 비밀번호 확인 일치 경고 */}
          {valid.passwordNotMatch ? (
            <AlertTag color="red">비밀번호가 일치하지 않습니다.</AlertTag>
          ) : (
            <AlertTag></AlertTag>
          )}
          <InputTag></InputTag>
          <InputTag></InputTag>
          <ProfileUpdateBtn
            width="100%"
            borderColor="#80E080"
            color="#80C0A0"
            activeBackground="rgba(128, 224, 128, 0.5)"
            onClick={() => submitState()}
          >
            저장
          </ProfileUpdateBtn>
        </SignupBody>
      </Body>
    </>
  );
};

export default UpdatePassword;
