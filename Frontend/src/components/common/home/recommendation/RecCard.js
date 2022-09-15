import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  background: #fff;
  margin: 2rem;
  width: 10rem;
  border: 1px solid black;
  flex-direction: column;
`;
const CardImg = styled.img`
  height: 5rem;
  padding: 1rem;
  display: flex;
  src: ${({ src }) => src};
`;
const CardHeader = styled.div`
  height: 2rem;
`;

const CardAddress = styled.div`
  height: 2rem;
`;
const CardTarget = styled.div`
  height: 2rem;
`;

const RecCard = ({ src, text }) => {
  return (
    <Card>
      <CardImg src={src}></CardImg>
      <CardHeader>{text}</CardHeader>

      <CardAddress></CardAddress>
      <CardTarget></CardTarget>
    </Card>
  );
};

export default RecCard;
