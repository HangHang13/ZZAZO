import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/layout/Header";

import {
  ButtonWrapper,
  PlanPageWrapper,
} from "../../components/styled/Wrapper";
import styled, { keyframes } from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import MapContainer from "../../components/kakaomap/MapContainer";
import { getPlan } from "../../api/PlanAPI";

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
    height: 100%;
    margin: 1rem;
  }
`;

PlanBlock.defaultProps = {
  bg: "white",
};
const ButtonBlock = styled.div`
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
ButtonBlock.defaultProps = {
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

const PlanMakeWrapper = styled.div`
  // background-color: aqua;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  height: 100%;
  min-height: 500px;
  user-select: none;
  overflow-x: hidden;
  overflow-y: hidden;

  @media screen and (max-width: 500px) {
    width: 100%;
    margin-top: 1rem;
    margin-bottom: -10rem;
  }
`;

const MapWrapper = styled.div`
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-height: 320px;
  border: 1px solid black;

  @media screen and (max-width: 4096px) {
    height: calc(100% - 6rem);
  }
  @media screen and (max-width: 1024px) {
    height: calc(100% - 4rem);
  }
  @media screen and (max-width: 500px) {
    justify-content: center;
    width: 100%;
    height: 300px;
    margin-bottom: -25vh;
  }
`;

MapWrapper.defaultProps = {
  width: "70%",
  height: "100%",
  boxShadow: "2px 0 4px 0 #303030",
};

const SectionTitle = styled.div`
  display: flex;
  width: ${({ width }) => width};
  height: 3rem;
  line-height: 3rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ bg }) => bg};
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  user-select: none;
  margin-bottom: 0.2rem;
  transition: 0.2s ease;

  @media screen and (max-width: 640px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

SectionTitle.defaultProps = {
  width: "100%",
  bg: "#80e080",
};
const PlanListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 6rem;
`;
const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  bottom: 0px;
  width: 100%;
  height: calc(100%);
  min-height: 480px;
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 500px) {
    height: ${({ mWidth }) => mWidth};
    margin-bottom: 0.5rem;
  }
`;
const PlaceCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding: 1rem;
  width: 80%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${({ bg }) => bg};
  border-radius: 16px;
  box-shadow: 4px 4px 16px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 1024px) and (min-width: 500px) {
    width: 60%;
  }
`;
const ShareButton = styled(ButtonWrapper)`
  animation: motion 0.5s linear infinite alternate;
  margin-top: 0px;
  width: 240px;
  background-color: #80e080;
  border: 1px solid #80c0a0;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
  color: white;
  @keyframes motion {
    0% {
      margin-top: 0px;
    }
    100% {
      margin-top: 0.2rem;
    }
  }
  @media screen and (max-width: 1000px) {
    width: 100vw;
  }
  @media screen and (max-width: 800px) {
    width: 70vw;
  }
  @media screen and (max-width: 500px) {
    width: 40vw;
    @keyframes motion {
      0% {
        margin-top: 0px;
      }
      100% {
        margin-top: 0px;
      }
    }
  }
`;
const PlaceTitle = styled.p`
  display: flex;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 10%;
`;
const PlaceCategory = styled.p`
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  margin-right: 10%;
`;
const PlaceAddress = styled.p`
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  margin-right: 10%;
`;
const PlanHeaderWrapper = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  // align-items: center;
  text-align: center;
  width: 100%;
  height: ${({ height }) => height};
  background-color: #c0f0e0;
  border-bottom: 3px solid black;
  word-wrap: break-word;
`;
const PlanHeaderItem = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: 32px;
  justify-content: center;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;
const PlanHeaderName = styled.p`
  display: flex;
  width: 30%;
  height: 100%;
  line-height: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  margin-right: 5%;

  @media screen and (max-width: 1000px) {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
PlanHeaderWrapper.defaultProps = {
  height: "120px",
  flexDirection: "column",
};
const PlanHeaderInput = styled.div`
  display: flex;
  width: calc(65% - 1rem);
  height: 100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  line-height: 100%;
  border: none;
  background-color: white;
  // justify-content: center;
  align-items: center;
`;

const PlanShare = () => {
  const isShared = location.href.includes("?shared=true");
  const params = useParams();
  console.log(params);
  const uselocation = useLocation();
  const dispatch = useDispatch();
  // console.log(uselocation);
  const [cardData, setCardData] = useState();

  const sharedUrl = `${location.href}${isShared ? "" : "?shared=true"}`;
  // console.log(sharedUrl);

  const returnHome = () => dispatch("/");

  const SharePage = (title) => {
    const shareUrl = sharedUrl;
    // const DOMAIN = "http://localhost:3000";
    // const CUSTOMURL = "/login";
    // // Kakao.Link.sendCustom({
    // //   templateId: 83518, // 내가 만든 템플릿 아이디를 넣어주면 된다
    // // });
    const image = `https://ifh.cc/g/AdX7fO.png`;
    console.log(image);
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "ZZAZO 일정 공유 \n약속이름 : " + title,
        description: "일정 공유 확인하세요.",
        imageUrl: image,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "일정 확인하기",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };
  const onKakaoClick = () => {
    const card = cardData;
    console.log(card);
    SharePage(`${card[0].title}`);
  };
  const getCardData = useCallback(async () => {
    // const { pathname, state } = uselocation;
    // console.log(pathname);
    // const result = isShared ? pathname.split("/")[0] : state;
    // const result = state ? state :
    // console.log(result);
    // if (!result) {
    //   // dispatch("/");
    //   return;
    // }
    // console.log(result);
    const data = await getPlan(params.cardId);
    console.log(data);
    // console.log(data.data.card);
    setCardData(data.data.card);
  }, [isShared, uselocation]);
  useEffect(() => {
    // console.log(process.env.REACT_APP_KAKAOLINK_API_KEY);
    // Kakao.init(process.env.REACT_APP_KAKAOLINK_API_KEY);
    // console.log(Kakao.isInitialized());
    getCardData();
    // console.log(cardData);
    // console.log(
    //   cardData ? cardData.filter((item) => !item.place_id)[0].latitude : 0
    // );
    // console.log(cardData);
    // const result = cardData.filter((item) => item.isMain === 1);
    // console.log(result);
  }, [getCardData, isShared]);

  return (
    <div align="center">
      <Header display="none" />
      {/* <SliderWrapper leftStart={start} leftEnd={end}> */}
      <PlanPageWrapper width="90vw">
        <PlanBlock height="calc(15vh - 3rem)">
          <Title>약속 공유</Title>
        </PlanBlock>
        <PlanBlock height="calc(15vh - 3rem)" justifyContent="center">
          <ShareButton onClick={onKakaoClick}>
            카카오톡으로 공유하기
          </ShareButton>
          {/* <button onClick={onKakaoClick}>
            <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"></img>
          </button> */}
        </PlanBlock>
        <PlanBlock
          justifyContent="center"
          width="100%"
          height="calc(72vh - 1rem)"
        >
          <PlanMakeWrapper width="calc(60% - 1rem)" height="100%">
            <MapWrapper mapName="make" width="99%" height="100%">
              <MapContainer
                lat={
                  cardData
                    ? cardData.filter((item) => !item.place_id)[0].latitude
                    : 34
                }
                lng={
                  cardData
                    ? cardData.filter((item) => !item.place_id)[0].longitude
                    : 127
                }
                mapLevel={5}
                placeList={[]}
                planList={cardData ? cardData : []}
              />
            </MapWrapper>
          </PlanMakeWrapper>
          {/* 약속 카드 */}
          <PlanMakeWrapper width="calc(30% - 1rem)" height="100%">
            <SectionTitle width="100%">약 속 카 드</SectionTitle>
            <PlanCard mWidth="50vh">
              <PlanHeaderWrapper>
                <PlanHeaderItem>
                  <PlanHeaderName>약속이름</PlanHeaderName>
                  <PlanHeaderInput>
                    {cardData ? cardData[0].title : ""}
                  </PlanHeaderInput>
                </PlanHeaderItem>
                <PlanHeaderItem>
                  <PlanHeaderName>약속날짜</PlanHeaderName>
                  <PlanHeaderInput>
                    {cardData ? cardData[0].date : ""}
                  </PlanHeaderInput>
                </PlanHeaderItem>
                <PlanHeaderItem>
                  <PlanHeaderName>약속시간</PlanHeaderName>
                  <PlanHeaderInput>
                    {cardData ? cardData[0].appointed_time : ""}
                  </PlanHeaderInput>
                </PlanHeaderItem>
              </PlanHeaderWrapper>
              <PlanListWrapper>
                {cardData ? (
                  cardData.map((item, index) => (
                    <PlaceCard
                      key={index}
                      bg={!item.place_id ? "#FF9BA9" : "#C0F0B0"}
                    >
                      <PlaceTitle>
                        {item.name ? item.name : "사용자 지정 위치"}
                      </PlaceTitle>
                      {!item.isMain && (
                        <PlaceCategory>{item.place_type}</PlaceCategory>
                      )}
                      <PlaceAddress>{item.address}</PlaceAddress>
                      {/* {!item.isMain && (
                            <PlaceInfoButton onClick={() => openModal(item._id)}>
                              <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                            </PlaceInfoButton>
                          )} */}
                    </PlaceCard>
                  ))
                ) : (
                  <></>
                )}
              </PlanListWrapper>
            </PlanCard>
          </PlanMakeWrapper>
        </PlanBlock>
      </PlanPageWrapper>
      {/* </SliderWrapper> */}
    </div>
  );
};

export default PlanShare;
