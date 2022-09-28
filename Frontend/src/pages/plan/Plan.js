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
