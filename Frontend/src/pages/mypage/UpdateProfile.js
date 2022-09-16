import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { SignupBody } from "../../components/auth/signup/Signup";
import { BaseForm } from "../../components/common/forms/Form";
import { client } from "./../../utils/client";
import { ButtonWrapper, InputWrapper } from "../../components/styled/Wrapper";
import InputCheckButton from "../../components/common/buttons/InputCheckButton";
import DivButton from "./../../components/common/buttons/DivButton";
import Modal from "../../components/modals/Modal";
import ProfileImageListContent from "../../components/modals/contents/ProfileImageListContent";
import ProfileTitle from "./../../components/mypage/ProfileTitle";
import { nickNameDuplicateCheck } from "../../api/AuthAPI";
import { getUser } from "../../api/mypage/MyPage";

const InputTag = styled.div`
  margin-top: 2rem;
`;
const InputBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 500px) {
    width: 130%;
  }
`;
const BirthSelectBox = styled.select`
  width: 30%;
  height: 52px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #d0d0d0;
  text-align: center;
  font-size: 0.9rem;
`;
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
  min-width: 6rem;
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
`;
const DefaultProfileButton = styled.button`
  border: 0;
  background-color: #ffffff;
  color: #80c0a0;
`;
const UpdateProfile = () => {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2MzMzMDk2NCwiaWF0IjoxNjYzMjQ0NTY0LCJqdGkiOiIxYWQxOTZjZTJmMTc0ZmVkYTE0MDViMjBiYjBkYTViNyIsInVzZXJfaWQiOjF9.wDzpt9zCAyBQCTMWf8bR9kRw_vZ8TJMZQmTrda725hY";
  const GetUser = async () => {
    const user = await getUser(token);
    console.log(user);
  };
  GetUser();
  const [profile, setProfile] = useState({
    userEmail: "aaa@naver.com",
    userPassword: "1q2w3e4r!@",
    userName: "홍길동",
    userNickName: "닉네임1",
    userPhone: "01000000000",
    userBirth: "1999-01-01",
    profileUrl: "1",
    userNickNameChecked: false,
  });
  const OriginProfile = {
    userEmail: "aaa@naver.com",
    userPassword: "1q2w3e4r!@",
    userName: "홍길동",
    userNickName: "닉네임1",
    userPhone: "01000000000",
    userBirth: "1999-01-01",
    profileUrl: "1",
    userNickNameChecked: false,
  };
  const [profileImgState, setProfileImgState] = useState("1");
  const [birthDate, setBirthDate] = useState({
    year: "1999",
    month: "01",
    day: "01",
  });

  const nickNameConfirmRef = useRef([]);
  const [modalState, setModalState] = useState(false);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  const onHandleChangeProfileImage = (profileImageId) => {
    setProfileImgState((prev) => profileImageId);
    console.log(profileImageId);
    closeModal();
  };
  //input 창 입력 시 이벤트
  const onHandleInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const onHandleNickNameDuplicateUpdate = async (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    const nickNameDuplicate = await nickNameDuplicateCheck(e.target.value);
    console.log(nickNameDuplicate.code);
    if (e.target.name === "userNickName" && nickNameDuplicate.code === 200) {
      setProfile({ ...profile, userNickNameChecked: true });
      console.log(profile.userNickNameChecked);
    } else {
      setProfile({ ...profile, userNickNameChecked: false });
      console.log(profile.userNickNameChecked);
    }
  };
  //닉네임 중복 체크
  const onHandleNickNameDuplicateCheck = (e) => {
    e.preventDefault();

    if (profile.userNickNameChecked) {
      alert("중복 확인이 완료된 닉네임입니다.");
      nickNameConfirmRef.current.disabled = true;
      nickNameConfirmRef.current.style.backgroundColor = "#f0f0f0";
      return;
    }
    if (profile.userNickName.length < 1) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    // const response = await client.get(
    //   `/users/checkemail?userEmail=${profile.userEmail}`
    // );
    const response = {
      code: 200,
    };

    if (response.code === 200) {
      const finish = confirm(
        "사용 가능한 닉네임입니다. 이 닉네임으로 변경하시겠습니까?"
      );
      if (finish) {
        setProfile({ ...profile, ["userNickNameChecked"]: true });
      }
    } else if (response.code === 401) {
      alert(response.message);
    } else {
      alert("오류가 발생했습니다.");
    }
  };
  const returnState = () => {
    nickNameConfirmRef.current.disabled = false;
    nickNameConfirmRef.current.style.backgroundColor = "#ffffff";
    setProfile(OriginProfile);
  };
  const submitState = async () => {
    if (!confirm("변경을 완료하시겠습니까?")) {
      return;
    }
    // 이름 : 길이 체크
    if (profile.userName.length < 1 || profile.userName.length > 12) {
      alert("이름은 1글자 이상 12글자 이하여야 합니다.");
      return;
    }
    // 이름 : 유효성 체크
    const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
    if (!nameRegex.test(profile.userName)) {
      alert("이름을 올바르게 입력해주세요.");
      return;
    }
    // 닉네임 : 길이 체크
    if (profile.userNickName.length < 1 || profile.userName.length > 12) {
      alert("닉네임은 1글자 이상 12글자 이하여야 합니다.");
      return;
    }
    if (!profile.userNickNameChecked) {
      // 닉네임 : 중복 확인 여부
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }
    // 휴대폰번호
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(profile.userPhone)) {
      alert("휴대폰 번호를 올바르게 입력해주세요.");
      return;
    }
    console.log(profile);
  };
  useEffect(() => {
    setProfileImgState(profileImgState);
    setProfile({
      ...profile,
      userBirth: birthDate.year + "-" + birthDate.month + "-" + birthDate.day,
      profileUrl: profileImgState,
    });
  }, [birthDate, profileImgState]);

  //날짜 구하는 로직
  const now = new Date();

  let years = [];
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y);
  }
  let month = [];
  for (let m = 1; m <= 12; m += 1) {
    if (m < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 월에 0을 붙혀준다
      month.push("0" + m.toString());
    } else {
      month.push(m.toString());
    }
  }
  let days = [];
  let date = new Date(birthDate.year, birthDate.month, 0).getDate();
  for (let d = 1; d <= date; d += 1) {
    if (d < 10) {
      // 날짜가 2자리로 나타나야 했기 때문에 1자리 일에 0을 붙혀준다
      days.push("0" + d.toString());
    } else {
      days.push(d.toString());
    }
  }
  //날짜 구하기 로직 종료
  return (
    <>
      <Modal
        isOpen={modalState}
        modalContent={
          <ProfileImageListContent
            profileImageState={profileImgState}
            onClcik={onHandleChangeProfileImage}
            close={closeModal}
          />
        }
      />
      <ProfileTitle
        isEdit={true}
        openModal={openModal}
        imageId={profileImgState}
        userName={profile.userName}
        userEmail={profile.userEmail}
      />
      <SignupBody>
        {/* <InputBlock>
          <ProfileImageLine>
            <LineTitle>프로필 이미지</LineTitle>
            <ProfileImage alt="profile" src={profileImgState.prifileUrl} />
            <ProfileUploadButton>업로드</ProfileUploadButton>
          </ProfileImageLine>
        </InputBlock>
        <InputBlock>
          <UserEmailLine>
            <h2>{profile.userName}</h2>
            {profile.userEmail}
            <DefaultProfileButton>기본 이미지로 변경</DefaultProfileButton>
          </UserEmailLine>
        </InputBlock> */}
        <InputTag>이름</InputTag>
        <InputBlock>
          <InputWrapper
            name="userName"
            type="text"
            value={profile.userName}
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
              value={profile.userNickName}
              placeholder="닉네임을 입력해주세요."
              onChange={onHandleInput}
              onKeyUp={onHandleNickNameDuplicateUpdate}
              ref={(el) => (nickNameConfirmRef.current = el)}
              width="80%"
            />
            <InputCheckButton message="중복 확인"></InputCheckButton>
          </InputBlock>
        </BaseForm>
        <InputTag>생년월일</InputTag>
        <InputBlock>
          <BirthSelectBox
            value={birthDate.year}
            onChange={(e) => {
              setBirthDate({ ...birthDate, year: e.target.value });
            }}
          >
            {years.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </BirthSelectBox>
          <BirthSelectBox
            value={birthDate.month}
            onChange={(e) => {
              setBirthDate({ ...birthDate, month: e.target.value });
            }}
          >
            {month.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </BirthSelectBox>
          <BirthSelectBox
            value={birthDate.day}
            onChange={(e) => {
              setBirthDate({ ...birthDate, day: e.target.value });
            }}
          >
            {days.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </BirthSelectBox>
        </InputBlock>
        <InputTag>휴대폰 번호</InputTag>
        <InputBlock>
          <InputWrapper
            name="userPhone"
            type="text"
            value={profile.userPhone}
            placeholder="휴대폰 번호를 입력해주세요. (ex. 01012341234)"
            onChange={onHandleInput}
            width="100%"
          />
        </InputBlock>
        <InputBlock>
          <InputCheckButton
            message="되돌리기"
            width="40%"
            clickEvent={() => returnState()}
          ></InputCheckButton>
          <InputCheckButton
            message="저장"
            width="40%"
            borderColor="#80E080"
            color="#80C0A0"
            clickEvent={() => submitState()}
          ></InputCheckButton>
        </InputBlock>
      </SignupBody>
    </>
  );
};

export default UpdateProfile;
