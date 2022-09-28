import React from "react";
import styled from "styled-components";

export default function Slide({ img }) {
  return (
    <ImgWrapper>
      <IMG src={img} />
    </ImgWrapper>
  );
}

const ImgWrapper = styled.div`
  width: 40rem;
`;
const IMG = styled.img`
  width: 40rem;
  height: 40rem;
`;
