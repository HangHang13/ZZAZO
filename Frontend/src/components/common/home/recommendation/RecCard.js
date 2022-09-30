import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  &:hover {
    transform: scale(1.1);
    transition: all 0.15s ease-in;
  }
  border-radius: 5px;
  box-shadow: 2px 2px 2px grey;
  display: flex;
  justify-content: center;

  background: #fff;
  margin: 2rem;
  width: 15rem;
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
  font-size: 1rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
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

const CardPlaceType = styled.div`
  font-weight: bold;
  font-size: 0.7rem;
  margin-bottom: 1rem;
`;
const InfoIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.2rem;
`;
const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
`;

const RecCard = ({ src, name, address, place_type, target, lat, lng }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() =>
        navigate("/planmakecard", {
          state: {
            content: {
              addressname: address,
              placename: name,
              roadname: address,
            },
            position: {
              lat: lat,
              lng: lng,
            },
          },
        })
      }
    >
      <CardImg src={src}></CardImg>
      <CardHeader>{name}</CardHeader>
      <CardBody>
        <CardPlaceType>
          <InfoIcon
            src={`${process.env.PUBLIC_URL}/assets/card/sushi.png`}
            alt="location"
          ></InfoIcon>
          {place_type}
        </CardPlaceType>
        <CardAddress>
          <InfoIcon
            src={`${process.env.PUBLIC_URL}/assets/card/location.png`}
            alt="location"
          ></InfoIcon>
          {address}
        </CardAddress>
        <CardTarget>
          <InfoIcon
            src={`${process.env.PUBLIC_URL}/assets/card/women.png`}
            alt="location"
          ></InfoIcon>
          {target}
        </CardTarget>
      </CardBody>
    </Card>
  );
};

export default RecCard;
