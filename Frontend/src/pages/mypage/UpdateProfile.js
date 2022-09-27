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
import { storeSetUserProfile } from "../../store/reducers/user";

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

const UpdateProfile = () => {
  //유저 정보 받아오기
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    userEmail: user.data.userEmail,
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
    userEmail: user.data.userEmail,
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
  useEffect(() => {
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
  }, []);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };
  const onHandleChangeProfileImage = (profileImageId) => {
    setProfileImgState({ ...profileImgState, imgId: profileImageId });
    closeModal();
  };
  //input 창 입력 시 이벤트
  const onHandleInput = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

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
  };
  const returnState = () => {
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
    //휴대폰번호 : 길이체크
    if (profile.userPhone.length !== 9) {
      alert("휴대폰 번호는 0~9의 수로 이루어진 9자입니다.");
      return;
    }
    // 휴대폰번호 : 유효성 체크
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

    const result = await updateProfile(data);

    if (!result.code === 200) {
      alert("프로필 정보 변경에 실패했습니다.");
      return;
    }

    alert("프로필 정보가 변경되었습니다.");
    dispatch(storeSetUserProfile({ isLogin: true, data: data }));
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
        width={400}
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
            placeholder="이름은 1글자 이상 12글자 이하."
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
              placeholder="닉네임은 1글자 이상 12글자 이하."
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
            placeholder="휴대폰 번호를 입력해주세요. (ex. 01012341234) 숫자 9자"
            onChange={onHandleInput}
            width="100%"
          />
        </InputBlock>
        <InputBlock>
          <ProfileUpdateBtn width="40%" onClick={() => returnState()}>
            되돌리기
          </ProfileUpdateBtn>
          <ProfileUpdateBtn
            width="40%"
            borderColor="#80E080"
            color="#80C0A0"
            activeBackground="rgba(128, 224, 128, 0.5)"
            onClick={() => submitState()}
          >
            저장
          </ProfileUpdateBtn>
        </InputBlock>
      </SignupBody>
    </>
  );
};

export default UpdateProfile;
