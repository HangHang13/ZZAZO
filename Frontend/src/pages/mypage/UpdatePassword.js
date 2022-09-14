import React, { useState } from "react";
import styled from "styled-components";
import { ButtonWrapper, InputWrapper } from "../../components/styled/Wrapper";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Line = styled.div`
  margin: 7%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const LineTitle = styled.div`
  max-width: 8.25rem;
  border-bottom: 1px solid #80c0a0;
  margin: auto;
  margin-bottom: 5%;
`;

const UpdatePassword = () => {
  const [state, setState] = useState({
    prevPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  return (
    <>
      <Body>
        <Line>
          <LineTitle>새 비밀번호</LineTitle>
          <InputWrapper
            width={"60%"}
            height={"30px"}
            placeholder="새 비밀번호"
          ></InputWrapper>
        </Line>
        <Line>
          <LineTitle>새 비밀번호 확인</LineTitle>
          <InputWrapper
            width={"60%"}
            height={"30px"}
            placeholder="새 비밀번호 확인"
          ></InputWrapper>
        </Line>
        <Line>
          <ButtonWrapper color={"#ffffff"} bg={"#80e080"} border="#80c0a0">
            저장
          </ButtonWrapper>
        </Line>
      </Body>
    </>
  );
};

export default UpdatePassword;
