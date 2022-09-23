import React, { useEffect, useState } from "react";
import Header from "./../../components/layout/Header";
import { BaseFlexWrapper, PlanPageWrapper } from "./../../components/styled/Wrapper";
import styled from "styled-components";
import Slider from "../../components/plancalendar/Slider";

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

const PlanCalendar = () => {
  const [planList, setPlanList] = useState([]);

  // useEffects
  useEffect(() => {
    window.scrollTo(0, 0);
    setPlanList([
      {
        placeAddress: "서울 서초구 강남대로 405-2",
        isMain: true,
      },
      {
        placeId: 2,
        placeName: "땀땀",
        placeAddress: "서울 강남구 강남대로98길 12-5",
        placeScore: 3.4,
        placeType: "음식점",
        isMain: false,
      },
      {
        placeId: 17453,
        placeName: "CGV 강남",
        placeAddress: "서울 강남구 강남대로 438 스타플렉스",
        placeScore: 3.3,
        placeType: "영화관",
      },
      {
        placeId: 456,
        placeName: "스타벅스 강남대로점",
        placeAddress: "서울 강남구 강남대로 456 한석타워 2층 1-2호",
        placeScore: 4.2,
        placeType: "커피전문점",
      },
      {
        placeId: 15346,
        placeName: "멀티캠퍼스 역삼",
        placeAddress: "서울 강남구 테헤란로 212",
        placeScore: 5.0,
        placeType: "학원",
      },
    ]);
  }, []);

  return (
    <div align="center">
      <Header />
      <PlanPageWrapper width="90vw">
        <PageHeaderBlock height="calc(20vh)" bg="yellow">
          <Title>공유 일정</Title>
        </PageHeaderBlock>
      </PlanPageWrapper>
      <div>
        <Slider></Slider>
      </div>
    </div>
  );
};

export default PlanCalendar;
