import React from "react";
import styled from "styled-components";
import PlanListItem from "./PlanListItem";

const PlanListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const PlanList = ({ pList, openModal, onHandleDrag }) => {
  return (
    <PlanListWrapper>
      {pList.length !== 0 ? (
        <>
          {pList.map((item, index) => (
            <PlanListItem
              {...item}
              idx={index}
              key={index}
              onHandleDrag={onHandleDrag}
              openModal={openModal}
            />
          ))}
        </>
      ) : (
        <>
          <p align="center"></p>
        </>
      )}
    </PlanListWrapper>
  );
};

export default PlanList;
