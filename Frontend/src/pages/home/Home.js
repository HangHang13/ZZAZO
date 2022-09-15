import React from "react";
import styled from "styled-components";
import Button from "../../components/common/buttons/Button";
import Introduce from "../../components/common/home/introduce/introduce";
import { Wrapper } from "../../components/styled/Wrapper";
import RecCard from "../../components/common/home/recommendation/RecCard";

import App from "./../../App";

const Home = () => {
  return (
    <HomeWrapper>
      <HomeNav>
        <HomeLogo>ZZAZO</HomeLogo>
        <HomeMenu>
          <HomeMenuItem href="/login">로그인</HomeMenuItem>
          <HomeMenuItem href="/signup">회원가입</HomeMenuItem>
        </HomeMenu>
      </HomeNav>

      <HomeBanner>
        <HomeBannerArea>
          <HomeBannerText>넌 놀기만 해! </HomeBannerText>
          <HomeBannerText>
            <BoldText>일정은</BoldText> &nbsp; 내가 짜조!
          </HomeBannerText>
          <br></br>
          <br></br>
          <BtnWrapper>
            <Button
              message="약속잡기"
              width="20rem"
              bg="#FFFFFF"
              borderColor="#FFFFFF"
              color="#000000"
              borderRadius="50px"
            ></Button>
          </BtnWrapper>
        </HomeBannerArea>
        <ImgWrapper
          width="24rem"
          height="24rem"
          src="../assets/main/play.png"
        ></ImgWrapper>
      </HomeBanner>
      <br />
      <br />
      <MiddleTitle>
        <Text fontsize="2rem">
          &nbsp;&nbsp;&nbsp;약속 장소 추천 서비스 - ZZAZO
        </Text>
      </MiddleTitle>
      <br></br>
      <hr></hr>
      <br />
      <br />
      <IntroduceList>
        <Introduce>
          <ImgWrapper
            width="7rem"
            height="7rem"
            src="../assets/introduce/introduce1.png"
          ></ImgWrapper>
          <Text fontsize="0.7rem">약속 상대와 만나고</Text>
          <Text fontsize="0.7rem">싶은 위치를 선택하세요!</Text>
        </Introduce>
        <Introduce>
          <ImgWrapper
            width="7rem"
            height="7rem"
            src="../assets/introduce/introduce2.png"
          ></ImgWrapper>
          <Text fontsize="0.7rem"> 나와 취향이 비슷한 사람들이 </Text>
          <Text fontsize="0.7rem">방문한 장소를 추천받을 수 있어요!</Text>
        </Introduce>
        <Introduce>
          <ImgWrapper
            width="7rem"
            height="7rem"
            src="../assets/introduce/introduce3.png"
          ></ImgWrapper>
          <Text fontsize="0.7rem">내가 선호하는</Text>
          <Text fontsize="0.7rem">장소들을 추천 받을수 있어요!</Text>
        </Introduce>
        <Introduce>
          <ImgWrapper
            width="7rem"
            height="7rem"
            src="../assets/introduce/introduce4.png"
          ></ImgWrapper>
          <Text fontsize="0.7rem"> 추천 받은 장소들을 골라</Text>
          <Text fontsize="0.7rem"> 약속 일정을 만들어 보세요!</Text>
        </Introduce>
        <Introduce>
          <ImgWrapper
            width="7rem"
            height="7rem"
            src="../assets/introduce/introduce5.png"
          ></ImgWrapper>
          <Text fontsize="0.7rem">만든 일정을 친구에게</Text>
          <Text fontsize="0.7rem"> 공유할 수 있어요!</Text>
        </Introduce>
      </IntroduceList>
      <RecTitle>이런 장소는 어때요?</RecTitle>
      <RecArea>
        <CardWrapper>
          <RecCard
            src="../assets/introduce/introduce1.png"
            text="광화문"
          ></RecCard>
          <RecCard
            src="../assets/introduce/introduce2.png"
            text="광화문"
          ></RecCard>
          <RecCard
            src="../assets/introduce/introduce3.png"
            text="광화문"
          ></RecCard>
          <RecCard
            src="../assets/introduce/introduce4.png"
            text="광화문"
          ></RecCard>
        </CardWrapper>
        <CardWrapper>
          <RecCard
            src="../assets/introduce/introduce1.png"
            text="광화문"
          ></RecCard>
          <RecCard
            src="../assets/introduce/introduce2.png"
            text="광화문"
          ></RecCard>
          <RecCard
            src="../assets/introduce/introduce3.png"
            text="광화문"
          ></RecCard>
          <RecCard
            src="../assets/introduce/introduce4.png"
            text="광화문"
          ></RecCard>
        </CardWrapper>
      </RecArea>

      <BtnWrapper>
        <Button
          message="약속잡기"
          width="20rem"
          bg="#C0F0B0"
          borderColor="#C0F0B0"
          color="#FFFFFF"
          borderRadius="16px"
        ></Button>
      </BtnWrapper>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  content-direction: column;
  margin: 0 auto;
  width: 70%;
`;

const CardWrapper = styled.div`
  display: flex;
`;

const HomeNav = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HomeLogo = styled.a`
  display : flex;
  align-items:center;
  font-size:3rem;
  margin 2rem;
  text-decoration: none;
  color: black;
  font-weight: bold;
`;

const HomeMenu = styled.div`
  display: flex;
  align-items: center;
`;

const HomeMenuItem = styled.a`
  margin: 3rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  color: black;
`;
const HomeBanner = styled.div`
  width: 100vw;
  margin-left: -22.5%;
  display: flex;
  justify-content: space-evenly;
  background-color: rgba(192, 240, 176, 0.2);
  align-items: center;
  height: 40rem;
`;

const HomeBannerArea = styled.div`
  display: flex;
  flex-direction: column;
`;
const HomeBannerText = styled.div`
  font-size: 4rem;
  font-weight: 200;
  display: flex;
  align-items: flex-end;
`;
const BtnWrapper = styled.div`
  margin: 0 auto;
  display: flex;
`;
const ImgWrapper = styled.img`
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-bottom: 1.5rem;
`;

const MiddleTitle = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: flex-end;
`;

const IntroduceList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const RecTitle = styled.div`
  text-align: center;
  font-size: 4rem;
  color: #b7e769;
  margin: 5rem 0;
`;

const RecArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: rgba(192, 240, 176, 0.2);
  align-items: center;
  height: 35rem;
  margin-bottom: 5rem;
`;
const Text = styled.p`
  margin-top: 0.4rem;
  font-weight: bold;
  font-size: ${({ fontsize }) => fontsize};
`;

const BoldText = styled.p`
  margin-top: 0.7rem;
  font-weight: 900;
  font-size: 4rem;
  color: #b7e769;
`;

export default Home;
