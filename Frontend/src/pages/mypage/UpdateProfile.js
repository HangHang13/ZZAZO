import React, { useState } from "react";
import styled from "styled-components";
import { InputWrapper, Wrapper } from "../../components/styled/Wrapper";

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
`;
const DefaultProfileButton = styled.button`
  border: 0;
  background-color: #ffffff;
  color: #80c0a0;
`;
const SeccondLine = styled.div`
  margin: 3.75rem 1.25rem;
  display: flex;
`;
const ThirdLine = styled.div`
  margin: 3.75rem 1.25rem;
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
const UpdateProfile = () => {
  const user = {
    userEmail: "aaa@naver.com",
    userName: "홍길동",
    userPassword: "1q2w3e4r!@",
    userNickName: "닉네임1",
    userPhone: "010-0000-0000",
    userBirth: "1999-01-01",
    userGender: 1,
    userCategory: "한식,일식,PC방,노래방",
    userRadius: 10,
  };
  const [profile, setProfile] = useState({
    name: "",
    nickName: "",
    year: 0,
    month: 0,
    day: 0,
  });
  return (
    <>
      <FirstLine>
        <ProfileImageLine>
          <LineTitle>프로필 이미지</LineTitle>
          <ProfileImage alt="profile" src={"assets/logo.png"} />
          <ProfileUploadButton>업로드</ProfileUploadButton>
        </ProfileImageLine>
        <UserEmailLine>
          이메일@gmail.com
          <DefaultProfileButton>기본 이미지로 변경</DefaultProfileButton>
        </UserEmailLine>
      </FirstLine>
      <SeccondLine>
        <InputLine>
          <LineTitle>이름</LineTitle>
          <InputWrapper
            width={200}
            height={150}
            placeholder="이름"
          ></InputWrapper>
        </InputLine>
        <InputLine>
          <LineTitle>닉네임</LineTitle>
          <InputWrapper
            width={200}
            height={150}
            placeholder="닉네임"
          ></InputWrapper>
        </InputLine>
      </SeccondLine>
      <ThirdLine>
        <InputLine>
          <LineTitle>생년월일</LineTitle>
          <BirthLine></BirthLine>
        </InputLine>
        <InputLine>
          <LineTitle>휴대폰</LineTitle>
        </InputLine>
      </ThirdLine>
    </>
  );
};

export default UpdateProfile;
