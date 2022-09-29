import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPlaceInfo } from "../../api/PlanAPI";
import ReviewCard from "./ReviewCard";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #000000b7;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 50rem;
  height: 28rem;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
  margin-bottom: 3rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  @media screen and (max-width: 870px) {
    width: 45rem;
    height: 28rem;
    margin-bottom: 0;
  }
  @media screen and (max-width: 770px) {
    top: 80%;
    width: 35rem;
    height: 50rem;
    flex-direction: column;
    margin-bottom: 0;
  }

  @media screen and (max-width: 635px) {
    width: 25rem;
    height: 45rem;
    flex-direction: column;
    margin-bottom: 0;
  }
`;
const ExitBtnWrapper = styled.div`
  width: 48rem;
  display: flex;

  @media screen and (max-width: 870px) {
    width: 43rem;
  }
  @media screen and (max-width: 770px) {
    width: 33rem;
  }
  justify-content: flex-end;
  @media screen and (max-width: 635px) {
    width: 25rem;
  }
`;

const CardTitle = styled.div`
  font-size: 2.3rem;
  font-weight: bold;
  padding-bottom: ;
`;
const CardLine = styled.hr`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: ${({ hrwidth }) => hrwidth};
  height: 0.1rem;
  background-color: black;
  color: black;
`;
const CardMainWrapper = styled.div`
  width: 50rem;
  height: 22rem;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 870px) {
    width: 40rem;
  }
  @media screen and (max-width: 770px) {
    margin-top: 18rem;
    width: 25rem;
    height: 10rem;
    flex-direction: column;
  }

  @media screen and (max-width: 635px) {
    margin-top: 15rem;
    width: 25rem;
    height: 10rem;
    flex-direction: column;
  }
`;

const CardInfoWrapper = styled.div`
  display: flex;
  width: 24rem;
  flex-direction: column;
  background-color: white;
  @media screen and (max-width: 870px) {
    width: 40rem;
  }
  @media screen and (max-width: 770px) {
    width: 24rem;
  }
  @media screen and (max-width: 635px) {
    width: 24rem;
  }
`;
const CardImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 870px) {
    padding-top: 1rem;
  }
`;
const CardInfo = styled.div`
  display: flex;
  height: 8rem;
  flex-direction: column;
`;
const CardInfoItem = styled.div`
  margin: 0.4rem;
  font-weight: bold;
`;
const InfoIcon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
`;
const CardImg = styled.img`
  width: 23rem;
  height: 18rem;
  margin-left: 1.5rem;
  border-radius: 16px;
  box-shadow: 2px 1px 1px grey;
  @media screen and (max-width: 870px) {
    width: 20rem;
    height: 15rem;
  }
  @media screen and (max-width: 635px) {
    width: 20.5rem;
    height: 13rem;
  }
`;
const InstaButtonWrapper = styled.div`
  width: 25rem;
  display: flex;
  margin-top: 1rem;
  margin-right: 1rem;
  justify-content: flex-end;
  @media screen and (max-width: 870px) {
    width: 21.5rem;
  }
`;
const ImgButton = styled.img`
  border-radius: 5px;
  width: 2rem;
  height: 2rem;
  @media screen and (max-width: 635px) {
    padding-right: 1.2rem;
  }
`;
const ReviewWrapper = styled.div`
  height: 10rem;
  border-radius: 10px;
  padding: 1rem;

  margin-bottom: 1rem;
  background-color: white;

  flex-direction: column;
  overflow-y: scroll;
  display: flex;
  @media screen and (max-width: 870px) {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  @media screen and (max-width: 635px) {
    overflow: hidden;
    width: 20rem;
  }
`;

const ReviewTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 900;
`;

//title : 장소명
//address : 주소
//category : 장소 카테고리
//target : 주요 이용 고객
//score : 별점
const CardDetail = ({ placeId, modalClose }) => {
  const [state, setState] = useState({
    title: "",
    address: "",
    category: "",
    target: "-",
    score: 0.0,
  });

  useEffect(async () => {
    const response = await getPlaceInfo(placeId);
    console.log(response.data.Place);
    setState({
      ...state,
      title: response.data.Place.name,
      address: response.data.Place.address,
      score: response.data.Place.placeScore
        ? parseFloat(response.data.Place.placeScore)
        : 0.0,
      category: response.data.Place.place_type,
    });
  }, [placeId]);

  return (
    <Background>
      <CardWrapper>
        <ExitBtnWrapper>
          <ImgButton
            src={`${process.env.PUBLIC_URL}/assets/card/exit.png`}
            alt="exit"
            onClick={() => modalClose(placeId)}
          ></ImgButton>
        </ExitBtnWrapper>
        <CardTitle>{state.title}</CardTitle>
        <CardLine width="50%"></CardLine>
        <CardMainWrapper>
          <CardInfoWrapper>
            <CardInfo>
              <CardInfoItem>
                <InfoIcon
                  src={`${process.env.PUBLIC_URL}/assets/card/location.png`}
                  alt="location"
                ></InfoIcon>
                {state.address}
              </CardInfoItem>
              <CardInfoItem>
                <InfoIcon
                  src={`${process.env.PUBLIC_URL}/assets/card/sushi.png`}
                  alt="location"
                ></InfoIcon>
                {state.category}
              </CardInfoItem>
              <CardInfoItem>
                <InfoIcon
                  src={`${process.env.PUBLIC_URL}/assets/card/women.png`}
                  alt="location"
                ></InfoIcon>
                {state.target}
              </CardInfoItem>
              <CardInfoItem>
                <InfoIcon
                  src={`${process.env.PUBLIC_URL}/assets/card/star.png`}
                  alt="location"
                ></InfoIcon>
                {state.score}
              </CardInfoItem>
            </CardInfo>
            <CardLine width="100%"></CardLine>
            <ReviewTitle>Review</ReviewTitle>
            <ReviewWrapper>
              <ReviewCard
                writer="김성수"
                writeday="2022 - 09 - 20"
                score="4.7"
                content="인생은 가지덮밥을 먹기 전과 후로 나뉜다."
              ></ReviewCard>
              <ReviewCard
                writer="김성수"
                writeday="2022 - 09 - 20"
                score="4.7"
                content="내 인생에 있어 가지는 변수가 아닌 상수다.내 인생에 있어 가지는 변수가 아닌 상수다. 내 인생에 있어 가지는 변수가 아닌 상수다."
              ></ReviewCard>
            </ReviewWrapper>
          </CardInfoWrapper>
          <CardImgWrapper>
            <CardImg
              src={`${process.env.PUBLIC_URL}/assets/card/gazi.png`}
              alt="gazi"
            ></CardImg>
            <InstaButtonWrapper>
              <a
                href={`https://www.instagram.com/explore/tags/${state.title.replace(
                  / /g,
                  ""
                )}/?hl=ko`}
                target="_blank"
              >
                <ImgButton
                  src={`${process.env.PUBLIC_URL}/assets/card/insta.png`}
                  alt="insta"
                ></ImgButton>
              </a>
            </InstaButtonWrapper>
          </CardImgWrapper>
        </CardMainWrapper>
      </CardWrapper>
    </Background>
  );
};

export default CardDetail;
