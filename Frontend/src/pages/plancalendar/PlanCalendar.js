import React, { useEffect, useState } from "react";
import Header from "./../../components/layout/Header";
import { BaseFlexWrapper, PlanPageWrapper } from "./../../components/styled/Wrapper";
import styled from "styled-components";
import Slider from "../../components/plancalendar/Slider";
import EmptyPlan from "./../../components/plancalendar/EmptyPlan";
import ReviewDetail from "../../components/plancalendar/ReviewDetail";
import Rating from "../../components/plancalendar/Rating";

const PageHeaderBlock = styled.div`
  display: flex;
  flex-direciton: column;
  align-items: start;
  width: 100%;
  height: 10vh;
  margin-top: 1rem;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #80c0a0;
  padding: 0 1rem 0.5rem 1rem;
  border-bottom: 3px solid #c0f0e0;
  min-width: 280px;

  @media screen and (max-width: 400px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 350px) {
    font-size: 2rem;
    padding: 0 0.5rem 0.25rem 0.5rem;
  }
`;

const MapWrapper = styled.div`
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-height: 300px;
  border: 1px solid black;

  @media screen and (max-width: 4096px) {
    height: calc(100% - 6rem);
  }
  @media screen and (max-width: 1024px) {
    height: calc(100% - 4rem);
  }
  @media screen and (max-width: 500px) {
    height: 25vh;
  }
`;

MapWrapper.defaultProps = {
  width: "70%",
  height: "100%",
  boxShadow: "2px 0 4px 0 #303030",
};

const SectionTitle = styled.div`
  display: flex;
  width: ${({ width }) => width};
  height: 3rem;
  line-height: 3rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ bg }) => bg};
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  user-select: none;
  margin-bottom: 0.2rem;

  @media screen and (max-width: 640px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

SectionTitle.defaultProps = {
  width: "100%",
  bg: "#80e080",
};

const SearchWrapper = styled.div`
  margin-bottom: 1.5rem;
  border-radius: 50px;
  width: 50rem;
  height: 5rem;
  background-color: #c0f0b0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 4px 2px 2px grey;
  @media screen and (max-width: 500px) {
    width: 25rem;
    height: 3rem;
  }
`;

const SearchOption = styled.select`
  width: 10rem;
  border-radius: 16px;
  height: 2.5rem;
  font-size: 1.5rem;
  box-shadow: 4px 2px 2px grey;
  @media screen and (max-width: 500px) {
    height: 2rem;
    width: 5rem;
  }
`;

const SearchInput = styled.input`
  width: 30rem;
  border-radius: 16px;
  height: 2.5rem;
  font-size: 1.5rem;
  box-shadow: 4px 2px 2px grey;
  @media screen and (max-width: 500px) {
    height: 2rem;
    width: 15rem;
  }
`;
const SearchIcon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  @media screen and (max-width: 500px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const PlanCalendar = () => {
  //상세 보기 모달
  const [modalOpen, setModalOpen] = useState(false);
  //모달 열고 닫기
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  //유저의플랜리스트
  const [userPlan, setuserPlan] = useState([]);
  //유저 공유일정 호출 api
  const TestPlan = () => {
    setuserPlan(!userPlan);
  };

  // useEffects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div align="center">
      <Header />

      <PlanPageWrapper width="90vw">
        <PageHeaderBlock height="calc(20vh)" bg="yellow">
          <Title>공유 일정 확인</Title>
        </PageHeaderBlock>
      </PlanPageWrapper>
      <button onClick={TestPlan}>테스트용버튼</button>
      <button onClick={modalClose}>모달열기</button>
      {modalOpen && <ReviewDetail modalClose={modalClose} title="석촌 호수 공원" address="서울시 강남대로 123" category="음식점 - 일식" target="20대 여성이 주로 방문해요" score="4.7"></ReviewDetail>}
      {userPlan ? (
        <>
          <SearchWrapper>
            <SearchOption>
              <option value="all" selected>
                All
              </option>
              <option value="title">약속명</option>
              <option value="date">약속 날짜</option>
            </SearchOption>
            <SearchInput type="search"></SearchInput>
            <SearchIcon src={`${process.env.PUBLIC_URL}/assets/plancalendar/SearchIcon.png`}></SearchIcon>
          </SearchWrapper>
          <Slider></Slider>
        </>
      ) : (
        <EmptyPlan></EmptyPlan>
      )}
    </div>
  );
};

export default PlanCalendar;
