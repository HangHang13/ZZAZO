import React from "react";
import styled from "styled-components";

const EmptyPlan = () => {
  return (
    <EmptyContainer>
      <EmptyImg
        src={`${process.env.PUBLIC_URL}/assets/plancalendar/emptyimg.png`}
      ></EmptyImg>
      <EmptyInfo>만들어진 약속 카드가 없어요</EmptyInfo>
      <EmptySmallInfo>새로운 약속 카드를 생성해보세요</EmptySmallInfo>
    </EmptyContainer>
  );
};

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50rem;
  height: 28rem;
  flex-direction: column;
  margin-bottom: 2rem;
`;
const EmptyImg = styled.img`
  margin: 0 auto;
  width: 25rem;
  hegiht: 14rem;
`;
const EmptyInfo = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const EmptySmallInfo = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

export default EmptyPlan;
