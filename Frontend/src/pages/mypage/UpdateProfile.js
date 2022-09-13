import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ButtonWrapper,
  InputWrapper,
  Wrapper,
} from "../../components/styled/Wrapper";

const ProfileImageLine = styled.div`
  margin-left: 4.125rem;
  margin-top: 2.75rem;
  font-size: 1rem;
  display: flex;
  max-width: 8.75rem;
  min-height: 10rem;
  flex-direction: column;
  text-align: center;
`;
const ProfileImage = styled.img`
  object-fit: contain;
`;
const ProfileUploadButton = styled.button`
  margin-top: -1.5rem;
  opacity: 0.8;
  min-height: 3rem;
  background-color: #e0f8d8;
  text-decoration: none;
  color: #ffffff;
  border: 0;
`;
const LineTitle = styled.div`
  max-width: 8.25rem;
  border-bottom: 1px solid #80c0a0;
  text-align: center;
  margin: auto;
  margin-bottom: 5%;
`;
const UserEmailLine = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  margin: 1.75rem;
`;
const FirstLine = styled.div`
  display: flex;
  justify-content: space-around;
`;
const DefaultProfileButton = styled.button`
  border: 0;
  background-color: #ffffff;
  color: #80c0a0;
`;
const SeccondLine = styled.div`
  margin: auto;
  margin-top: 5%;
  display: flex;
`;
const ThirdLine = styled.div`
  margin: auto;
  margin-top: 5%;
  display: flex;
`;
const SubmitLine = styled.div`
  margin: auto;
  justify-content: space-around;
  margin-top: 5%;
  display: flex;
`;
const InputLine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: auto;
`;
const BirthLine = styled.div`
  display: flex;
`;
const PhoneLine = styled.div`
  display: flex;
`;
const UpdateProfile = () => {
  const [profileState, setProfileState] = useState({
    userEmail: "aaa@naver.com",
    userName: "홍길동",
    userPassword: "1q2w3e4r!@",
    userNickName: "닉네임1",
    userPhone: "010-0000-0000",
    userBirth: "1999-01-01",
    year: 0,
    month: 0,
    day: 0,
    userGender: 1,
    userCategory: "한식,일식,PC방,노래방",
    userRadius: 10,
  });
  const OriginProfile = {
    userEmail: "aaa@naver.com",
    userName: "홍길동",
    userPassword: "1q2w3e4r!@",
    userNickName: "닉네임1",
    userPhone: "010-0000-0000",
    userBirth: "1999-01-01",
    year: 0,
    month: 0,
    day: 0,
    userGender: 1,
    userCategory: "한식,일식,PC방,노래방",
    userRadius: 10,
  };
  useEffect(() => {
    const userProfile = {
      userEmail: profileState.userEmail,
      userName: profileState.userName,
      userPassword: profileState.userPassword,
      userNickName: profileState.userNickName,
      userPhone: profileState.userPhone,
      year:
        profileState.userBirth !== null
          ? profileState.userBirth.substr(0, 4)
          : "0000",
      month:
        profileState.userBirth !== null
          ? profileState.userBirth.substr(5, 2)
          : "00",
      day:
        profileState.userBirth !== null
          ? profileState.userBirth.substr(8, 2)
          : "00",
      userGender: profileState.userGender,
      userCategory: profileState.userCategory,
      userRadius: profileState.userRadius,
    };
    setProfileState((prevState) => {
      return { ...prevState, ...userProfile };
    });
  }, []);

  return (
    <>
      <FirstLine>
        <ProfileImageLine>
          <LineTitle>프로필 이미지</LineTitle>
          <ProfileImage alt="profile" src={"assets/logo.png"} />
          <ProfileUploadButton>업로드</ProfileUploadButton>
        </ProfileImageLine>
        <UserEmailLine>
          {profileState.userEmail}
          <DefaultProfileButton>기본 이미지로 변경</DefaultProfileButton>
        </UserEmailLine>
      </FirstLine>
      <SeccondLine>
        <InputLine>
          <LineTitle>이름</LineTitle>
          <InputWrapper
            width={"180px"}
            height={"30px"}
            placeholder="이름"
            value={profileState.userName}
          ></InputWrapper>
        </InputLine>
        <InputLine>
          <LineTitle>닉네임</LineTitle>
          <InputWrapper
            width={"180px"}
            height={"30px"}
            placeholder="닉네임"
            value={profileState.userNickName}
          ></InputWrapper>
        </InputLine>
      </SeccondLine>
      <ThirdLine>
        <InputLine>
          <LineTitle>생년월일</LineTitle>
          <BirthLine>
            <InputWrapper
              width={"80px"}
              height={"30px"}
              value={profileState.year}
            ></InputWrapper>
            년
            <InputWrapper
              width={"40px"}
              height={"30px"}
              value={profileState.month}
            ></InputWrapper>
            월
            <InputWrapper
              width={"40px"}
              height={"30px"}
              value={profileState.day}
            ></InputWrapper>
            일
          </BirthLine>
        </InputLine>
        <InputLine>
          <LineTitle>휴대폰</LineTitle>
          <PhoneLine>
            <InputWrapper
              width={"30px"}
              height={"30px"}
              value={profileState.userPhone.substr(0, 3)}
            ></InputWrapper>
            -
            <InputWrapper
              width={"40px"}
              height={"30px"}
              value={profileState.userPhone.substr(4, 4)}
            ></InputWrapper>
            -
            <InputWrapper
              width={"40px"}
              height={"30px"}
              value={profileState.userPhone.substr(9, 4)}
            ></InputWrapper>
          </PhoneLine>
        </InputLine>
      </ThirdLine>
      <SubmitLine>
        <ButtonWrapper>되돌리기</ButtonWrapper>
        <ButtonWrapper color={"#ffffff"} bg={"#80e080"} border="#80c0a0">
          저장
        </ButtonWrapper>
      </SubmitLine>
    </>
  );
};

export default UpdateProfile;
