import React from "react";
import styled from "styled-components";
import { ButtonWrapper } from "./../../components/styled/Wrapper";
import InputCheckButton from "./../../components/common/buttons/InputCheckButton";

const Body = styled.div`
  position: relative;
`;
const DeleteForm = styled.div`
  width: 70%;
  max-width: 35rem;
  min-height: 16.25rem;
  min-width: 12rem;

  border-radius: 10px;
  border: 2px solid #80c0a0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 500px) {
    left: 65%;
    width: 100%;
  }
`;
const DeleteTitle = styled.div`
  color: #80c0a0;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 3rem;
  @media screen and (max-width: 500px) {
    margin-left: 25%;
  }
`;
const Description = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 5rem;
  font-size: 1.5rem;
  @media screen and (max-width: 500px) {
    font-size: 1.3rem;
  }
`;

const DeleteProfile = () => {
  return (
    <>
      <Body>
        <DeleteTitle>계정 탈퇴</DeleteTitle>
        <DeleteForm>
          <Description>계정을 정말로 탈퇴하시겠습니까?</Description>
          <InputCheckButton
            message="계정 탈퇴"
            width={"12rem"}
            color="red"
            borderColor="red"
            bg="white"
          ></InputCheckButton>
        </DeleteForm>
      </Body>
    </>
  );
};

export default DeleteProfile;
