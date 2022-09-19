import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { SignupBody } from "../../components/auth/signup/Signup";
import { BaseForm } from "../../components/common/forms/Form";
import { client } from "./../../utils/client";
import {
  InputFullWrapper,
  InputWrapper,
} from "../../components/styled/Wrapper";
import InputCheckButton from "../../components/common/buttons/InputCheckButton";
import DivButton from "./../../components/common/buttons/DivButton";
import Modal from "../../components/modals/Modal";
import ProfileImageListContent from "../../components/modals/contents/ProfileImageListContent";
import ProfileTitle from "./../../components/mypage/ProfileTitle";
import { nickNameDuplicateCheck } from "../../api/AuthAPI";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../components/common/buttons/Button";
import { updateProfile } from "../../api/MyPageAPI";
import { useNavigate } from "react-router-dom";

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
const UpdateProfile = () => {
  //유저 정보 받아오기
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  const [profile, setProfile] = useState({
    userName: user.data.userName,
    userNickName: user.data.userNickName,
    userBirth: user.data.userBirth,
    userPhone: user.data.userPhone,
    profileUrl: user.data.profileUrl,
    year: user.data.Birth !== null ? user.data.userBirth.substr(0, 4) : "0000",
    month: user.data.Birth !== null ? user.data.userBirth.substr(5, 2) : "00",
    day: user.data.Birth !== null ? user.data.userBirth.substr(8, 2) : "00",
    userNickNameChecked: true,
  });
  const OriginProfile = {
    userName: user.data.userName,
    userNickName: user.data.userNickName,
    userBirth: user.data.userBirth,
    userPhone: user.data.userPhone,
    profileUrl: user.data.profileUrl,
    year: user.data.Birth !== null ? user.data.userBirth.substr(0, 4) : "0000",
    month: user.data.Birth !== null ? user.data.userBirth.substr(5, 2) : "00",
    day: user.data.Birth !== null ? user.data.userBirth.substr(8, 2) : "00",
    userNickNameChecked: true,
  };
  const [profileImgState, setProfileImgState] = useState({
    imgId: "",
  });

  const [birthDate, setBirthDate] = useState({
    year: user.data.Birth !== null ? user.data.userBirth.substr(0, 4) : "0000",
    month: user.data.Birth !== null ? user.data.userBirth.substr(5, 2) : "00",
    day: user.data.Birth !== null ? user.data.userBirth.substr(8, 2) : "00",
  });

  const nickNameConfirmRef = useRef();
  const [modalState, setModalState] = useState(false);
  useEffect(
    () => {
      const userProfileRequest = {
        userName: profile.userName,
        userNickName: profile.userNickName,
        userBirth: `${birthDate.year}-${birthDate.month}-${birthDate.day}`,
        userPhone: profile.userPhone,
        profileUrl: !user.data.profileUrl ? "1" : user.data.profileUrl,
        year: birthDate.year,
        month: birthDate.month,
        day: birthDate.day,
      };
      setProfileImgState((prevState) => {
        return { ...prevState, imgId: userProfileRequest.profileUrl };
      });
      setProfile((prevState) => {
        return { ...prevState, ...userProfileRequest };
      });
      console.log(userProfileRequest);
      // alert();
    },
    [
      // birthDate,
      // profile.userName,
      // profile.userNickName,
      // profile.userPhone,
      // profileImgState.imgId,
    ]
  );
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  const onHandleChangeProfileImage = (profileImageId) => {
    setProfileImgState({ ...profileImgState, imgId: profileImageId });
    console.log(profileImageId);
    console.log(profileImgState);
    closeModal();
  };
  //input 창 입력 시 이벤트
  const onHandleInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  // const onHandleNickNameDuplicateUpdate = async (e) => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  //   const nickNameDuplicate = await nickNameDuplicateCheck(e.target.value);
  //   console.log(nickNameDuplicate.code);
  //   if (e.target.name === "userNickName" && nickNameDuplicate.code === 200) {
  //     setProfile({ ...profile, userNickNameChecked: true });
  //     console.log(profile.userNickNameChecked);
  //   } else {
  //     setProfile({ ...profile, userNickNameChecked: false });
  //     console.log(profile.userNickNameChecked);
  //   }
  // };
  //닉네임 중복 체크
  const onHandleNickNameDuplicateCheck = async (e) => {
    e.preventDefault();
    const data = {
      userNickName: profile.userNickName,
    };
    const result = await nickNameDuplicateCheck(data);
    if (
      user.data.userNickName === profile.userNickName ||
      result.code === 200
    ) {
      alert("중복 확인이 완료된 닉네임입니다.");
      setProfile({ ...profile, userNickNameChecked: true });
      nickNameConfirmRef.current.disabled = true;
      nickNameConfirmRef.current.style.backgroundColor = "#f0f0f0";
      return;
    } else if (result.code === 401) {
      alert(result.message);
      nickNameConfirmRef.current.focus();
      setProfile({ ...profile, userNickNameChecked: false });
      return;
    } else {
      alert("오류가 발생하였습니다.");
      nickNameConfirmRef.current.focus();
      setProfile({ ...profile, userNickNameChecked: false });
    }
    if (profile.userNickName.length < 1) {
      alert("닉네임을 입력해주세요.");
      nickNameConfirmRef.current.focus();
      setProfile({ ...profile, userNickNameChecked: false });
      return;
    }
    // const response = await client.get(
    //   `/users/checkemail?userEmail=${profile.userEmail}`
    // );
    // const response = await client.get(
    //   `/users/checkemail?userEmail=${profile.userEmail}`
    // );
    // const response = {
    //   code: 200,
    // };

    // if (response.code === 200) {
    //   const finish = confirm(
    //     "사용 가능한 닉네임입니다. 이 닉네임으로 변경하시겠습니까?"
    //   );
    //   if (finish) {
    //     setProfile({ ...profile, ["userNickNameChecked"]: true });
    //   }
    // } else if (response.code === 401) {
    //   alert(response.message);
    // } else {
    //   alert("오류가 발생했습니다.");
    // }
  };
  const returnState = () => {
    console.log("먹어라");
    nickNameConfirmRef.current.disabled = false;
    nickNameConfirmRef.current.style.backgroundColor = "#ffffff";
    setProfile(OriginProfile);
    setBirthDate({
      ...birthDate,
      year: OriginProfile.year,
      month: OriginProfile.month,
      day: OriginProfile.day,
    });
  };
  const submitState = async () => {
    console.log("제출");
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
    const userBirthday = `${birthDate.year}-${birthDate.month}-${birthDate.day}`;
    const data = {
      userName: profile.userName,
      userBirth: userBirthday,
      userNickName: profile.userNickName,
      userPhone: profile.userPhone,
      userRadius: 0,
      profileUrl: profileImgState.imgId,
    };
    //유저정보수정
    // console.log(data);
    const result = await updateProfile(data);
    console.log(result);
    if (result.code === 200) {
      alert("프로필 정보가 변경되었습니다.");
      console.log(result.data);
    }
    //네비게이트
  };
  //1. 맨처음 초기값 null
  //2. null이므로 1로 setProfile
  //profileImgState가 리랜더링 되면서 useEffect에 있는 setProfile 동작
  //3. 1=> 1 setProfile
  //4. Img = > 1

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
            profileImageState={profileImgState.imgId}
            onClick={onHandleChangeProfileImage}
            close={closeModal}
          />
        }
      />
      <ProfileTitle
        isEdit={true}
        openModal={openModal}
        imageId={profileImgState.imgId}
        userName={profile.userName}
        userEmail={profile.userEmail}
      />
      <SignupBody>
        <InputTag>이름</InputTag>
        <InputBlock>
          <InputFullWrapper
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
              // onKeyUp={onHandleNickNameDuplicateUpdate}
              ref={nickNameConfirmRef}
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
          <InputFullWrapper
            name="userPhone"
            type="text"
            value={profile.userPhone}
            placeholder="휴대폰 번호를 입력해주세요. (ex. 01012341234)"
            onChange={onHandleInput}
            width="100%"
          />
        </InputBlock>
        <InputBlock>
          <Button
            message="되돌리기"
            width="40%"
            clickEvent={() => returnState()}
          ></Button>
          <Button
            message="저장"
            width="40%"
            borderColor="#80E080"
            color="#80C0A0"
            clickEvent={() => submitState()}
          ></Button>
        </InputBlock>
      </SignupBody>
    </>
  );
};

export default UpdateProfile;
