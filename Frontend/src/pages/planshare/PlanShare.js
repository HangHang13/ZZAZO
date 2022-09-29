import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/layout/Header";

import { PlanPageWrapper, Wrapper } from "../../components/styled/Wrapper";
import styled, { keyframes } from "styled-components";
import fontawesome from "@fortawesome/fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Landing from "../../components/plan/Landing";
import { SliderWrapper } from "../../components/styled/SliderWrapper";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import MapContainer from "../../components/kakaomap/MapContainer";
import PlanHeader from "../../components/plan/cards/PlanHeader";
import PlanList from "../../components/plan/cards/PlanList";

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
    width: 100%;
    height: 25vh;
    margin-bottom: -15vh;
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

const PlanShare = () => {
  const isShared = location.href.includes("?shared=true");

  const uselocation = useLocation();
  const dispatch = useDispatch();
  console.log(uselocation);
  const [cardData, setCardData] = useState();

  const sharedUrl = `${location.href}${isShared ? "" : "?shared=true"}`;
  console.log(sharedUrl);

  const returnHome = () => dispatch("/");

  const SharePage = (title) => {
    const shareUrl = `${location.href}?shared=true`;
    // const DOMAIN = "http://localhost:3000";
    // const CUSTOMURL = "/login";
    // // Kakao.Link.sendCustom({
    // //   templateId: 83518, // 내가 만든 템플릿 아이디를 넣어주면 된다
    // // });
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "ZZAZO 일정 공유" + title,
        description: "일정 공유 확인하세요.",
        imageUrl: `${process.env.PUBLIC_URL}/assets/ZZAZOLOGO.png`,
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
    const { pathname, state } = uselocation;
    const result = isShared ? pathname.split("/")[0] : state;
    if (!result) {
      dispatch("/");
      return;
    }
    console.log(result);
    // const data = await getCardResult(cardId);
    setCardData(result);
  }, [isShared, uselocation]);
  useEffect(() => {
    // console.log(process.env.REACT_APP_KAKAOLINK_API_KEY);
    // Kakao.init(process.env.REACT_APP_KAKAOLINK_API_KEY);
    // console.log(Kakao.isInitialized());
    getCardData();
    // console.log(cardData);
    // const result = cardData.filter((item) => item.isMain === 1);
    // console.log(result);
  }, [getCardData, isShared]);

  return (
    <div align="center">
      <Header display="none" />
      {/* <SliderWrapper leftStart={start} leftEnd={end}> */}
      <PlanPageWrapper width="90vw">
        <PlanBlock height="calc(25vh - 3rem)">
          <Title>약속 공유</Title>
        </PlanBlock>
        <PlanBlock height="calc(25vh - 3rem)" justifyContent="center">
          <button onClick={onKakaoClick}>
            <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"></img>
          </button>
        </PlanBlock>
        <PlanBlock
          justifyContent="center"
          width="100%"
          height="calc(80vh - 1rem)"
        >
          <PlanMakeWrapper width="calc(60% - 1rem)" height="100%">
            <MapWrapper mapName="make" width="99%" height="100%">
              <MapContainer
                lat={
                  cardData
                    ? cardData.filter((item) => item.isMain === 1)[0].latitude
                    : 0
                }
                lng={
                  cardData
                    ? cardData.filter((item) => item.isMain === 1)[0].longitude
                    : 0
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
              <PlanHeader
              // dateValue={planInfo.date}
              // onHandleName={onHandleName}
              // onHandleDate={onHandleDate}
              // onHandleTime={onHandleTime}
              />
              {/* <PlanList
                pList={planList}
                setPList={setPlanList}
                openModal={openModal}
                onHandleList={onHandleList}
                listType={ListTypes.PLAN}
              /> */}
            </PlanCard>
          </PlanMakeWrapper>
        </PlanBlock>
      </PlanPageWrapper>
      {/* </SliderWrapper> */}
    </div>
  );
};

export default PlanShare;
