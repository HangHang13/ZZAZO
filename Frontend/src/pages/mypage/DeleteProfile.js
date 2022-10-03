import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { deleteProfile } from "../../api/MyPageAPI";
import { storeLogout } from "../../store/reducers/user";
import { useNavigate } from "react-router-dom";
const Body = styled.div`
  position: relative;
`;
const DeleteForm = styled.div`
  width: 70%;
  max-width: 35rem;
  min-height: 16.25rem;
  min-width: 18rem;

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
  margin-bottom: 1rem;
  font-size: 1.5rem;
  @media screen and (max-width: 500px) {
    font-size: 1.3rem;
  }
`;
const SmallDescription = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 4rem;
  font-size: 1.2rem;
  color: gray;
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
const ProfileUpdateBtn = styled.button`
  display: flex;
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

const DeleteProfile = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteUser = async () => {
    const result = await deleteProfile(user.data.userEmail);
    if (result.code === 200) {
      alert("계정이 탈퇴되었습니다.");
      dispatch(storeLogout());
      navigate("/");
    } else {
      alert("계정탈퇴에 실패하였습니다.");
    }
  };
  return (
    <>
      <Body>
        <DeleteTitle>계정 탈퇴</DeleteTitle>
        <DeleteForm>
          <Description>계정을 탈퇴하시겠습니까?</Description>
          <SmallDescription>
            사용자와 관련한 모든 정보가 지워집니다.
            <br />
            정말로 계정을 탈퇴하시겠습니까?
          </SmallDescription>
          <ProfileUpdateBtn
            width={"12rem"}
            color="red"
            borderColor="red"
            bg="white"
            activeBackground="rgba(255,0,0,0.5)"
            onClick={deleteUser}
          >
            계정 탈퇴
          </ProfileUpdateBtn>
        </DeleteForm>
      </Body>
    </>
  );
};

export default DeleteProfile;
