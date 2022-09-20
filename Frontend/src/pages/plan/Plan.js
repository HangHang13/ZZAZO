import React from "react";
import Header from "./../../components/layout/Header";
import SelectPosition from "./SelectPosition";
import CreatePlan from "./CreatePlan";
import { PlanPageWrapper, Wrapper } from "./../../components/styled/Wrapper";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FullPage } from "react-full-page/lib";
import { Slide } from "react-full-page";
import Map from "../../components/plan/Map";
import Landing from "../../components/plan/Landing";

const PlanBlock = styled.div`
  display: flex;
  flex-direciton: column;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  width: 100%;
  height: ${({ height }) => height};

  @media screen and (max-width: 500px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

PlanBlock.defaultProps = {
  bg: "white",
};

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
  width: 70%;
  height: 100%;
  box-shadow: 2px 0 4px 0 #303030;

  @media screen and (max-width: 1000px) {
    width: 65%;
  }
  @media screen and (max-width: 800px) {
    width: 60%;
  }
  @media screen and (max-width: 500px) {
    display: block;
    width: 100%;
    height: 40%;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  height: 100%;
  box-shadow: 2px 0 4px 0 #303030;

  @media screen and (max-width: 1000px) {
    width: 35%;
  }
  @media screen and (max-width: 800px) {
    width: 40%;
  }
  @media screen and (max-width: 500px) {
    display: block;
    width: 100%;
    height: 60%;
  }
`;

const MainPlaceInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 90%;
  height: 2.5rem;
  border-radius: 8px;
  border: none;
  margin-top: 1rem;
  filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.25));
`;

const MainPlaceSearchButton = styled.button`
  position: relative;
  height: 100%;
  width: 15%;
  background-color: white;
  border: none;
  border-radius: 8px;
`;

const MainPlaceInput = styled.input`
  display: flex;
  width: 80%;
  height: 100%;
  line-height: 100%;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  fone-weight: bold;
`;

PlanBlock.defaultProps = {
  height: "8rem",
};

fontawesome.library.add(faMagnifyingGlass);

const Plan = () => {
  return (
    <div align="center">
      <FullPage
        beforeChange={() => {
          console.log("here go");
        }}
      >
        <Slide>
          <Header display="none" />
          <PlanPageWrapper width="90vw">
            <PlanBlock height="calc(25vh - 3rem)">
              <Title>약속 장소 선택</Title>
            </PlanBlock>
            <PlanBlock
              height="calc(75vh - 3rem)"
              justifyContent="space-between"
            >
              {/* 카카오맵 구현 부분 */}
              {/* Map.js component MapWrapper */}
              {/* <Map /> */}
              {/* <MapWrapper></MapWrapper> */}
              {/* 장소 리스트 구현 부분 */}
              {/* LendingPage.js */}
              <Landing />
              {/* <ListWrapper>
                <MainPlaceInputWrapper>
                  <MainPlaceSearchButton>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                  </MainPlaceSearchButton>
                  <MainPlaceInput placeholder="약속장소 입력" />
                </MainPlaceInputWrapper>
              </ListWrapper> */}
            </PlanBlock>
          </PlanPageWrapper>
        </Slide>
        <Slide>
          <PlanPageWrapper width="90vw">
            <PlanBlock height="calc(25vh - 3rem)">
              <Title>약속 카드 생성</Title>
            </PlanBlock>
            <PlanBlock
              height="calc(75vh - 3rem)"
              justifyContent="space-between"
            >
              카드 생성 부분
            </PlanBlock>
          </PlanPageWrapper>
        </Slide>
      </FullPage>
    </div>
  );
};

export default Plan;
