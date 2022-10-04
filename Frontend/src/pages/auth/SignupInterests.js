import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NumberCircle from "../../components/auth/NumberCircle";
import InterestsList from "../../components/auth/signup/InterestsList";
import {
  ProgressBlock,
  ProgressDescription,
  SignupBody,
  SignupHeader,
} from "../../components/styled/Signup";
import { MobileSizeWrapper, Wrapper } from "./../../components/styled/Wrapper";
import DivButton from "./../../components/common/buttons/DivButton";
import { signup } from "../../api/AuthAPI";
import Header from "../../components/layout/Header";
import Loading from "./../../components/common/Loading";
import EmptySpace from "./../../components/layout/EmptySpace";

// 임시 interests 더미데이터
const intList = [
  {
    mainCategoryId: 0,
    subCategoryId: 0,
    categoryName: "한식",
    icon: "fa-light fa-bowl-food",
  },
  {
    mainCategoryId: 0,
    subCategoryId: 1,
    categoryName: "일식",
    icon: "fa-light fa-bowl-food",
  },
  {
    mainCategoryId: 0,
    subCategoryId: 2,
    categoryName: "중식",
    icon: "fa-light fa-bowl-food",
  },
  {
    mainCategoryId: 0,
    subCategoryId: 3,
    categoryName: "양식",
    icon: "fa-light fa-bowl-food",
  },
  {
    mainCategoryId: 0,
    subCategoryId: 4,
    categoryName: "치킨",
    icon: "fa-light fa-bowl-food",
  },
];

const firstCategoryList = ["식사", "카페,주류", "놀거리,취미", "관람", "걷기"];

const secondCategoryList = [
  [
    "간식 / 분식 / 후식",
    "고기",
    "탕 / 찌개",
    "해산물",
    "한식",
    "치킨",
    "일식",
    "양식",
    "샐러드",
    "아시아음식",
    "중식",
    "뷔페 / 레스토랑",
    "패스트푸드",
    "피자",
  ],
  ["카페", "제과 / 빵", "술집", "와인 바", "차", "칵테일 바", "호프 / 주점"],
  ["테마카페", "PC방", "볼링장", "헬스장", "실외활동", "노래방"],
  ["미술관", "백화점", "서점 / 도서관", "시장", "영화관", "공연"],
  ["테마거리", "공원"],
];

const InterestsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const InterestsHeader = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid grey;
`;

const SignupInterests = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState(state); // form.userCategory = []
  const [loading, setLoading] = useState(false);

  const onHandleInterestClick = (categoryName) => {
    if (form.userCategory.includes(categoryName)) {
      // userCategory 안에 클릭한 카테고리가 있으면
      setForm({
        ...form,
        userCategory: form.userCategory.filter((item) => item !== categoryName),
      });
    } else {
      // userCategory 안에 클릭한 카테고리가 없으면
      setForm({ ...form, userCategory: [...form.userCategory, categoryName] });
    }
  };

  const submitForm = async () => {
    if (!confirm("가입을 완료하시겠습니까?")) {
      return;
    }

    setLoading(true);
    const newForm = {
      userEmail: form.userEmail,
      userName: form.userName,
      password: form.password,
      password2: form.password2,
      userNickName: form.userNickName,
      userPhone: form.userPhone,
      userBirth: form.userBirth,
      userGender: form.userGender,
      userCategory: form.userCategory,
    };

    const response = await signup(newForm);
    setLoading(false);
    if (response.code === 200 || response.code === 201) {
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } else {
      alert("회원가입에 실패했습니다.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (state === null) {
      alert("비정상적인 접근입니다.");
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <Wrapper>
        {loading ? <Loading /> : null}
        <MobileSizeWrapper>
          <SignupHeader>
            <ProgressBlock>
              <NumberCircle color="#C0F0B0" number="1" />
              <ProgressDescription>회원정보 입력</ProgressDescription>
            </ProgressBlock>
            <ProgressBlock>
              <NumberCircle color="#C0F0B0" number="2" />
              <ProgressDescription>관심정보 입력</ProgressDescription>
            </ProgressBlock>
          </SignupHeader>
          <SignupBody>
            {firstCategoryList.map((item, index) => (
              <InterestsWrapper key={index}>
                <InterestsHeader>{item}</InterestsHeader>
                <InterestsList
                  intList={secondCategoryList[index]}
                  onHandleInterestClick={onHandleInterestClick}
                />
              </InterestsWrapper>
            ))}
          </SignupBody>
          <DivButton
            message="완 료"
            width="98%"
            borderColor="#80E080"
            color="#80C0A0"
            clickEvent={() => submitForm()}
          ></DivButton>
          <EmptySpace></EmptySpace>
        </MobileSizeWrapper>
      </Wrapper>
    </>
  );
};

export default SignupInterests;
