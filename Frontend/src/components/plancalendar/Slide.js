import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  MapWrapper,
  PlaceAddress,
  PlaceTitle,
  PlanBlock,
  PlanMakeWrapper,
} from "../styled/PlanCard";
import { PlaceCard } from "./../styled/PlanCard";

const SlideWrapper = styled.div`
  display: flex;
  width: 60rem;
  border: 1px solid #d0d0d0;
  border-radius: 16px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Slide = ({ cardData }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    cardId: cardData[0].cardId,
    title: cardData[0].title,
    year: null,
    month: null,
    day: null,
    hour: null,
    minute: null,
    cardData: cardData,
  });
  useEffect(() => {
    const dateSplit = cardData[0].date.split("-");
    const timeSplit = cardData[0].appointed_time.split(":");
    setState({
      ...state,
      year: dateSplit[0],
      month: dateSplit[1],
      day: dateSplit[2],
      hour: timeSplit[0],
      minute: timeSplit[1],
    });
  }, []);

  const onHandleCardClick = () => {
    let form = [];
    cardData.map((item) => {
      form.push({
        title: item.title,
        date: item.date,
        appointed_time: item.appointed_time,
        place_id: item.place_id ? item.place_id : null,
        address: item.address,
        isMain: item.place_id !== null ? 0 : 1,
        latitude: item.latitude,
        longitude: item.longitude,
        place_type: item.place_type,
        name: item.name,
        priority: item.priority,
      });
    });

    navigate(`/planshare/${cardData[0].cardId}`, {
      state: {
        cardId: cardData[0].cardId,
        form: form,
      },
    });
  };
  return (
    <SlideWrapper>
      <PlaceCard bg="#C0F0B0" onClick={onHandleCardClick}>
        <PlaceTitle>{state.title}</PlaceTitle>
        <PlaceAddress>
          {state.year}년 {state.month}월 {state.day}일
        </PlaceAddress>
        <PlaceAddress>
          {state.hour}시 {state.minute}분
        </PlaceAddress>
        <PlaceAddress></PlaceAddress>
      </PlaceCard>
    </SlideWrapper>
  );
};

export default Slide;
