import React from "react";
import styled from "styled-components";
import Navbar from "../../components/layout/Navbar";
import { Wrapper } from "../../components/styled/Wrapper";

const Home = () => {
  return (
    // <Navbar></Navbar>
    <div>
      <Navbar></Navbar>
      <HomeNav>
        <HomeLogo>ZZAZO</HomeLogo>
        <HomeMenu>
          <HomeMenuItem>로그인</HomeMenuItem>
          <HomeMenuItem>회원가입</HomeMenuItem>
        </HomeMenu>
      </HomeNav>

      <HomeBanner>
        <HomeBannerArea>
          <HomeBannerText>넌 놀기만 해! </HomeBannerText>
          <HomeBannerText>일정은 내가 짜조</HomeBannerText>
          <HomeBannerBtn>약속잡기</HomeBannerBtn>
        </HomeBannerArea>

        <ImgWrapper src="../assets/logo.png"></ImgWrapper>
      </HomeBanner>
    </div>
  );
};

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
  color: black;
`;
const HomeBanner = styled.div`
  display: flex;
  width
  background-color: rgba(192, 240, 176, 0.2);
  align-items: center;
  height: 30rem;
`;

const HomeBannerArea = styled.div`
  display: flex;
  flex-direction: column;
`;
const HomeBannerText = styled.div`
  font-size: 5rem;
  display: flex;
`;
const HomeBannerBtn = styled.div`
  display: flex;
`;
const ImgWrapper = styled.img`
  display: flex;
  width: 10rem;
`;

export default Home;
