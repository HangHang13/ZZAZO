import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Introduce from "../../components/common/home/introduce/introduce";
import RecCard from "../../components/common/home/recommendation/RecCard";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import BackgroundCloud from "../../components/common/home/banner/BackgroundCloud";
import { getRec } from "../../api/HomeApi";
import { Wrapper } from "../../components/styled/Wrapper";
import Footer from "../../components/layout/Footer";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    RecLoad();
  }, []);

  //약속 선택으로 넘길

  //약속카드 상세 모달
  const [modalOpen, setModalOpen] = useState(false);
  //메인페이지 추천 장소
  const [recList, setRecList] = useState(null);
  //모달 열고 닫기
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  //메인페이지 추천장소 api 호출
  const RecLoad = async () => {
    const RecData = await getRec();
    if (RecData.code === 200) setRecList(RecData);
  };

  //카테고리에 따른 이미지 다르게 보여주기
  function CategoryImg(categorys) {
    switch (categorys) {
      case "한식":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/korea.png`;
      case "한정식":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/koreapremium.png`;
      case "커피전문점":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/coffee.png`;
      case "펜션":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/pension.png`;
      case "국밥":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/kukbab.png`;
      case "닭요리":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/chickenfood.png`;
      case "육류,고기":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/meat.png`;
      case "치킨":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/chicken.png`;
      case "도시락":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/dosirak.png`;
      case "테마카페":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/temacafe.png`;
      case "제과,베이커리":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/bakery.png`;
      case "아이스크림":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/icecream.png`;
      case "디저트카페":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/dessertcafe.png`;
      case "서점":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/bookstore.png`;
      case "퓨전한식":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/mixkorean.png`;
      case "공원":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/park.png`;
      case "헬스클럽":
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/Health.png`;

      default:
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/default.png`;
    }
  }

  return (
    <>
      <Header></Header>
      <Wrapper>
        <HomeWrapper>
          <HomeBanner>
            <BackgroundCloud></BackgroundCloud>
            <HomeBannerArea>
              <HomeBannerText>넌 놀기만 해! </HomeBannerText>
              <HomeBannerText>
                <BoldText>일정은</BoldText> &nbsp; 내가 짜조!
              </HomeBannerText>
              <BtnWrapper>
                <PlanBtn onClick={() => navigate("/plan")}>약속잡기</PlanBtn>
              </BtnWrapper>
            </HomeBannerArea>
            <BannerImg
              src={`${process.env.PUBLIC_URL}/assets/main/play.png`}
            ></BannerImg>
          </HomeBanner>

          <br />
          <br />
          <MiddleTitle>약속 장소 추천 서비스 - ZZAZO</MiddleTitle>
          <br></br>
          <hr></hr>
          <br />
          <br />
          <IntroduceList>
            <Introduce>
              <ImgWrapper
                width="7rem"
                height="7rem"
                src={`${process.env.PUBLIC_URL}/assets/introduce/introduce1.png`}
              ></ImgWrapper>
              <Text fontsize="0.7rem">약속 상대와 만나고</Text>
              <Text fontsize="0.7rem">싶은 위치를 선택하세요!</Text>
            </Introduce>
            <Introduce>
              <ImgWrapper
                width="7rem"
                height="7rem"
                src={`${process.env.PUBLIC_URL}/assets/introduce/introduce2.png`}
              ></ImgWrapper>
              <Text fontsize="0.7rem"> 나와 취향이 비슷한 사람들이 </Text>
              <Text fontsize="0.7rem">방문한 장소를 추천받을 수 있어요!</Text>
            </Introduce>
            <Introduce>
              <ImgWrapper
                width="7rem"
                height="7rem"
                src={`${process.env.PUBLIC_URL}/assets/introduce/introduce3.png`}
              ></ImgWrapper>
              <Text fontsize="0.7rem">내가 선호하는</Text>
              <Text fontsize="0.7rem">장소들을 추천 받을수 있어요!</Text>
            </Introduce>
            <Introduce>
              <ImgWrapper
                width="7rem"
                height="7rem"
                src={`${process.env.PUBLIC_URL}/assets/introduce/introduce4.png`}
              ></ImgWrapper>
              <Text fontsize="0.7rem"> 추천 받은 장소들을 골라</Text>
              <Text fontsize="0.7rem"> 약속 일정을 만들어 보세요!</Text>
            </Introduce>
            <Introduce>
              <ImgWrapper
                width="7rem"
                height="7rem"
                src={`${process.env.PUBLIC_URL}/assets/introduce/introduce5.png`}
              ></ImgWrapper>
              <Text fontsize="0.7rem">만든 일정을 친구에게</Text>
              <Text fontsize="0.7rem"> 공유할 수 있어요!</Text>
            </Introduce>
          </IntroduceList>
          <RecTitle>이런 장소는 어때요?</RecTitle>
          <RecArea>
            <CardWrapper>
              {recList && (
                <>
                  {recList.data.Place.map((item, idx) => (
                    <RecCard
                      key={idx}
                      lat={item.latitude}
                      lng={item.longitude}
                      src={CategoryImg(item.place_type)}
                      name={item.name}
                      address={item.address}
                      targetage={item.popularAge}
                      targetgender={item.popularGender}
                      place_type={item.place_type}
                    />
                  ))}
                </>
              )}
            </CardWrapper>
          </RecArea>

          <Footer></Footer>
        </HomeWrapper>
      </Wrapper>
    </>
  );
};

const PlanBtn = styled.button`
  &:hover {
    transform: scale(1.1);
  }
  border-radius: 50px;
  box-shadow: 3px 3px 3px gray;
  position: relative;
  background-color: white;
  border: none;
  font-size: 1rem;
  color: black;
  font-weight: bold;
  padding: 1rem;
  width: 10rem;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  @media screen and (max-width: 900px) {
    width: 9rem;
  }
  @media screen and (max-width: 700px) {
    width: 40vw;
  }
  @media screen and (max-width: 500px) {
    width: 80vw;
    font-size: 1rem;
  }
`;

const HomeWrapper = styled.div`
  content-direction: column;
  margin: 0 auto;
  width: 70vw;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (max-width: 500px) {
    margin-right: 4.5rem;
    width: 15rem;
    display: flex;
    flex-direction: column;
  }
`;

const HomeBanner = styled.div`
  width: 100vw;
  margin-left: -21.5%;
  display: flex;
  justify-content: space-evenly;
  background-color: rgba(192, 240, 176, 0.2);
  align-items: center;
  height: 35rem;
  @media screen and (max-width: 605px) {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
`;

const HomeBannerArea = styled.div`
  display: flex;
  flex-direction: column;
  align-itmes: flex-end;
`;
const HomeBannerText = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  display: flex;
  align-items: flex-end;
  @media screen and (max-width: 900px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 700px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 500px) {
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
`;

const BannerImg = styled.img`
  &:hover {
    animation: vibration 0.5s infinite;
  }
  @keyframes vibration {
    from {
      transform: rotate(2deg);
    }
    to {
      transform: rotate(-2deg);
    }
  }
  width: 25rem;
  height: 25rem;
  @media screen and (max-width: 1000px) {
    width: 23rem;
    height: 23rem;
  }
  @media screen and (max-width: 800px) {
    width: 20rem;
    height: 20rem;
  }
  @media screen and (max-width: 500px) {
    margin-top: 2rem;
    margin-bottom: 1rem;
    width: 15rem;
    height: 15rem;
  }
`;
const BtnWrapper = styled.div`
  padding-top: 4.5rem;
  margin: 0 auto;
  display: flex;
  @media screen and (max-width: 500px) {
    padding-top: 1rem;
  }
`;
const ImgWrapper = styled.img`
  margin-top: 0.6rem;
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-bottom: 1.5rem;
  @media screen and (max-width: 900px) {
    width: 6rem;
    height: 6rem;
  }
  @media screen and (max-width: 700px) {
    width: 5rem;
    height: 5rem;
  }
  @media screen and (max-width: 500px) {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 0.8rem;
    margin-left: 0.8rem;
  }
  @media screen and (max-width: 400px) {
    width: 2rem;
    height: 2rem;
    margin-right: 0.7rem;
    margin-left: 0.7rem;
  }
`;

const MiddleTitle = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: flex-end;
  font-size: 2rem;
  font-weight: bold;
  @media screen and (max-width: 800px) {
    font-size: 1.7rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 1.3rem;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
    justify-content: center;
    align-items: center;
  }
`;

const IntroduceList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const RecTitle = styled.div`
  padding-top: 1rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 900;
  color: #b7e769;
  margin: 5rem 0;
  @media screen and (max-width: 1000px) {
    font-size: 3.5rem;
  }
  @media screen and (max-width: 800px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 2.15rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 1.9rem;
  }
  @media screen and (max-width: 360px) {
    font-size: 1.7rem;
  }
  @media screen and (max-width: 320px) {
    font-size: 1.6rem;
  }
`;

const RecArea = styled.div`
  width: 100vw;
  margin-left: -21.5%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: rgba(192, 240, 176, 0.2);
  align-items: center;
`;
const Text = styled.p`
  margin-top: 0.4rem;
  font-weight: bold;
  font-size: ${({ fontsize }) => fontsize};
  @media screen and (max-width: 850px) {
    font-size: 1px;
    margin-top: 0;
  }
  @media screen and (max-width: 710px) {
    font-size: 0.01rem;
    margin-top: 0;
  }
`;

const BoldText = styled.p`
  margin-top: 0.7rem;
  font-weight: 900;
  font-size: 3.6rem;
  color: #b7e769;
  @media screen and (max-width: 900px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 700px) {
    font-size: 2.5rem;
  }
  @media screen and (max-width: 500px) {
    margin-top: -0.6rem;
    margin-bottom: 0.3rem;
  }
`;

export default Home;
