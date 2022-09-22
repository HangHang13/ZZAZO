import React from "react";
import styled from "styled-components";
import { ButtonWrapper } from "./../../components/styled/Wrapper";
import InputCheckButton from "./../../components/common/buttons/InputCheckButton";
import Button from "./../../components/common/buttons/Button";
import { useSelector } from "react-redux";
import { deleteProfile } from "../../api/MyPageAPI";
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
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const deleteUser = async () => {
    const result = await deleteProfile();
    if (result.code === 200) {
      alert("계정이 탈퇴되었습니다.");
      // console.log(state.confirmPassword);
      console.log(result.data);
    } else {
      alert("계정탈퇴에 실패하였습니다.");
      // console.log(state.confirmPassword);
      console.log(result.data);
    }
  };
  return (
    <>
      <Body>
        <DeleteTitle>계정 탈퇴</DeleteTitle>
        <DeleteForm>
          <Description>계정을 정말로 탈퇴하시겠습니까?</Description>
          <Button
            message="계정 탈퇴"
            width={"12rem"}
            color="red"
            borderColor="red"
            bg="white"
            clickEvent={deleteUser}
          ></Button>
        </DeleteForm>
      </Body>
    </>
  );
};

export default DeleteProfile;
