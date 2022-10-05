import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { ButtonWrapper, PlanPageWrapper } from "../../components/styled/Wrapper";
import styled, { keyframes } from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MapContainer from "../../components/kakaomap/MapContainer";
import { getPlan } from "../../api/PlanAPI";
import ReviewDetail from "./../../components/plancalendar/ReviewDetail";
import {
  MapWrapper,
  PlaceAddress,
  PlaceCard,
  PlaceCategory,
  PlaceTitle,
  PlanBlock,
  PlanCard,
  PlanHeaderInput,
  PlanHeaderItem,
  PlanHeaderName,
  PlanHeaderWrapper,
  PlanListWrapper,
  PlanMakeWrapper,
  SectionTitle,
} from "../../components/styled/PlanCard";
import { getReview } from "../../api/ReviewAPI";

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
    width: 80vw;
    font-size: 1.2rem;
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

const CardTitle = styled.div`
  display: flex;
  font-size: 1.1rem;
  font-weight: bold;
`;

const CardNumber = styled.div`
  display: flex;
  font-size: 0.9rem;
  padding: 0.1rem;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 100%;
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const PlanShare = () => {
  /**공유여부판단 url */
  const isShared = location.href.includes("?shared=true");
  /**url 파라미터(cardId) */
  const params = useParams();
  /**전달값 받는 용도의 useLocation */
  const uselocation = useLocation();
  /**페이지 이동을 위한 디스패치 */
  const dispatch = useDispatch();
  /**약속카드 상태관리 */
  const [cardData, setCardData] = useState();
  /**모달 state */
  const [modalOpen, setModalOpen] = useState(false);
  /**공유링크 url */
  const sharedUrl = `${location.href}${isShared ? "" : "?shared=true"}`;
  /**로그인 여부 판단 */
  const authenticated = useSelector((state) => state.user.value.isLogin);
  const returnHome = () => dispatch("/");
  /**페이지 공유링크 전송 함수 */
  const SharePage = (title) => {
    /**공유링크 url */
    const shareUrl = sharedUrl;
    /**공유링크 썸네일 이미지 url */
    const image = `https://ifh.cc/g/AdX7fO.png`;
    /**커스텀 메시지 */
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
  /**카카오 공유버튼 클릭 시 호출 */
  const onKakaoClick = () => {
    /**제목 정하기 위한 약속카드 정보 */
    const card = cardData;
    SharePage(`${card[0].title}`);
  };
  /**약속카드 조회 api 호출 후 약속카드 상태갱신 */
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
    /**약속 카드 조회 호출 데이터 */
    const data = await getPlan(params.cardId);
    console.log(data);
    /**약속카드 상태 갱신 */
    setCardData(data.data.card);
  }, [isShared, uselocation]);

  const [placeselect, setplaceselect] = useState(0);
  const [placeinfo, setplaceinfo] = useState({
    _id: 0,
    name: "",
    placeScore: 0,
    address: "",
    place_type: "",
    placeUrl: "",
  });
  const [myrating, setmyrating] = useState(0);

  const onHandleModal = (placeId) => {
    if (placeId === null) return;
    const ReviewCardLoad = async () => {
      const ReviewCardData = await getReview(placeId);
      console.log("장소단건조회");
      console.log(ReviewCardData);
      if (ReviewCardData.data.reviews != "") {
        setmyrating(ReviewCardData.data.reviews.score);
      }
      // console.log(ReviewCardData);
      setplaceinfo({
        ...placeinfo,
        ["_id"]: placeId,
        ["name"]: ReviewCardData.data.Place.name,
        ["placeScore"]: ReviewCardData.data.Place.placeScore,
        ["address"]: ReviewCardData.data.Place.address,
        ["place_type"]: ReviewCardData.data.Place.place_type,
        ["placeUrl"]: ReviewCardData.data.Place.placeUrl,
      });
    };
    ReviewCardLoad();
    setplaceselect(placeId);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    getCardData();
  }, [getCardData, isShared, myrating]);

  return (
    <div align="center">
      {modalOpen && <ReviewDetail myrating={myrating} placeid={placeselect} placeinfo={placeinfo} modalClose={onHandleModal} target="20대 여성이 주로 방문해요"></ReviewDetail>}
      <Header display="none" />
      <PlanPageWrapper width="90vw">
        <PlanBlock height="calc(15vh - 3rem)">
          <Title>약속 공유</Title>
        </PlanBlock>
        {authenticated && (
          <PlanBlock height="calc(15vh - 3rem)" justifyContent="center">
            <ShareButton onClick={onKakaoClick}>
              <img
                src="https://i0.wp.com/forhappywomen.com/wp-content/uploads/2018/11/%EC%82%B0%EB%B6%80%EC%9D%B8%EA%B3%BC-%ED%8F%AC%ED%95%B4%ED%94%BC%EC%9A%B0%EB%A8%BC-%EB%AC%B8%EC%9D%98-%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%8C%EB%9F%AC%EC%8A%A4%EC%B9%9C%EA%B5%AC-%EB%B2%84%ED%8A%BC.png?w=586&ssl=1"
                alt="kakao_logo"
                style={{ width: 30, height: 30, marginRight: 5 }}
              ></img>
              카카오톡으로 공유하기
            </ShareButton>
          </PlanBlock>
        )}
        <PlanBlock justifyContent="center" width="100%" height="calc(72vh - 1rem)">
          <PlanMakeWrapper width="calc(60% - 1rem)" height="100%">
            <MapWrapper mapName="make" width="99%" height="100%">
              <MapContainer
                lat={cardData ? cardData.filter((item) => !item.place_id)[0].latitude : 34}
                lng={cardData ? cardData.filter((item) => !item.place_id)[0].longitude : 127}
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
                  <PlanHeaderInput>{cardData ? cardData[0].title : ""}</PlanHeaderInput>
                </PlanHeaderItem>
                <PlanHeaderItem>
                  <PlanHeaderName>약속날짜</PlanHeaderName>
                  <PlanHeaderInput>{cardData ? cardData[0].date : ""}</PlanHeaderInput>
                </PlanHeaderItem>
                <PlanHeaderItem>
                  <PlanHeaderName>약속시간</PlanHeaderName>
                  <PlanHeaderInput>{cardData ? cardData[0].appointed_time : ""}</PlanHeaderInput>
                </PlanHeaderItem>
              </PlanHeaderWrapper>
              <PlanListWrapper>
                {cardData ? (
                  cardData.map((item, index) => (
                    <PlaceCard key={index} bg={!item.place_id ? "#FF9BA9" : "#C0F0B0"} onClick={() => onHandleModal(item.place_id)}>
                      <PlaceTitle>{item.name ? item.name : "사용자 지정 위치"}</PlaceTitle>
                      {!item.isMain && <PlaceCategory>{item.place_type}</PlaceCategory>}
                      <PlaceAddress>{item.address}</PlaceAddress>
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
    </div>
  );
};

export default PlanShare;
