import React, { useRef, useState } from "react";
import styled from "styled-components";
import Checkbox from "../../components/common/inputs/Checkbox";
import { InputWrapper, Wrapper } from "./../../components/styled/Wrapper";
import { useNavigate } from "react-router-dom";
import AuthButton from "./../../components/common/buttons/AuthButton";
import { login } from "../../api/AuthAPI";
import Header from "./../../components/layout/Header";

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
  margin-top: -8rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 1rem;
  border: 1px solid #80c0a0;
  border-radius: 8px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 528px) {
    width: 90vw;
  }
`;

const LogoImage = styled.img`
  width: 100px;
  height: 80px;
  margin-bottom: 1rem;
  @media screen and (max-width: 528px) {
    height: 30%;
  }
`;

const LoginInput = styled(InputWrapper)`
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Option = styled.div`
  font-size: 1rem;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const OptionBorder = styled.div`
  border-left: 0.5px solid #d0d0d0;
  border-right: 0.5px solid #d0d0d0;
  margin-left: 0.9rem;
  margin-right: 0.9rem;
`;

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
    console.log(state);
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
  };

  return (
    <>
      <Header />
      <Wrapper>
        <ColWrapper>
          <LoginWrapper>
            <LogoImage src="/assets/logo.png" />
            <LoginInput
              name="userEmail"
              value={state.userEmail}
              width="80%"
              height="52px"
              placeholder="아이디"
              onChange={onHandleInput}
              onKeyPress={handleOnKeyPress}
              ref={idRef}
            />
            <LoginInput
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
              <Checkbox
                text="자동 로그인"
                tagName="autoLogin"
                onCheckHandler={onCheckHandler}
              />
              <Checkbox
                text="아이디 저장"
                tagName="idSave"
                onCheckHandler={onCheckHandler}
              />
            </Options>
            <AuthButton message="로 그 인" clickEvent={LoginSubmit} />
          </LoginWrapper>
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
