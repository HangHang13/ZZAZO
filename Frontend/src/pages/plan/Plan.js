import React, { useEffect, useState } from "react";
import Header from "./../../components/layout/Header";

import { PlanPageWrapper, Wrapper } from "./../../components/styled/Wrapper";
import styled, { keyframes } from "styled-components";
import fontawesome from "@fortawesome/fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Landing from "../../components/plan/Landing";
import { SliderWrapper } from "./../../components/styled/SliderWrapper";

const PlanBlock = styled.div`
  display: flex;
  flex-direciton: column;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  width: 100%;
  height: ${({ height }) => height};

  @media screen and (max-width: 500px) {
    flex-direction: column;
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
  const [start, setStart] = useState(-100);
  const [end, setEnd] = useState(5);

  const onHandlePageOut = () => {
    setStart(end);
    setEnd(-100);
  };

  return (
    <div align="center">
      <Header display="none" />
      <SliderWrapper leftStart={start} leftEnd={end}>
        <PlanPageWrapper width="90vw">
          <PlanBlock height="calc(25vh - 3rem)">
            <Title>약속 장소 선택</Title>
          </PlanBlock>
          <PlanBlock height="calc(70vh - 3rem)" justifyContent="space-between">
            <Landing onHandlePageOut={onHandlePageOut} />
          </PlanBlock>
        </PlanPageWrapper>
      </SliderWrapper>
    </div>
  );
};

export default Plan;
