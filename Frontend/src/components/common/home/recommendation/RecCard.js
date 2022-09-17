import React from "react";
import styled from "styled-components";

const Card = styled.div`
  &:hover {
    transform: scale(1.1);
  }
  border-radius: 5px;
  box-shadow: 2px 2px 2px grey;
  display: flex;
  justify-content: center;
  text-align: center;
  background: #fff;
  margin: 2rem;
  width: 13rem;
  border: none;
  flex-direction: column;
`;
const CardImg = styled.img`
  height: 10rem;
  padding: 1rem;
  display: flex;
  src: ${({ src }) => src};
`;
const CardHeader = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const CardAddress = styled.div`
  font-weight: bold;
  font-size: 0.7rem;
  margin-bottom: 1rem;
`;
const CardTarget = styled.div`
  font-weight: bold;
  font-size: 0.7rem;
  margin-bottom: 2rem;
`;

const RecCard = ({ src, text, address, target }) => {
  return (
    <Card>
      <CardImg src={src}></CardImg>
      <CardHeader>{text}</CardHeader>

      <CardAddress>{address}</CardAddress>
      <CardTarget>{target}</CardTarget>
    </Card>
  );
};

export default RecCard;
