import React, { useState } from "react";
import styled from "styled-components";
import { IoIosMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Common = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  width: 100vw;
  height: 4rem;
  background-color: rgba(192, 240, 176, 0.5);
  @media screen and (max-width: 500px) {
    flex-direction: column;
    background-color: rgba(192, 240, 176, 0.5);
  }
`;

const Home = styled.a`
    display: flex;
    align-items:center;
    font-size: 2rem;
    margin 1rem;
    text-decoration: none;
    color: black;
    font-weight: 900;
    @media screen and (max-width: 500px) {
      font-size : 2rem;
      margin : 1rem;
    }
`;

const NavbarItemList = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-end;
    margin-top: 1rem;
    display: ${({ menu }) => {
      return menu === false ? "none" : "flex";
    }};
  }
`;

const NavItem = styled.a`
  &:hover {
    transform: scale(1.2);
  }
  text-shadow: 2px 1px 1px #b7e769;
  margin-right: 3rem;
  font-size: 0.8rem;

  text-decoration: none;
  font-weight: bold;
  color: black;
  @media screen and (max-width: 500px) {
    margin: 0.5rem;
  }
`;

const Menubar = styled.a`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  position: absolute;
  margin-top: 1rem;
  right: 2rem;
  height: 2rem;
  @media screen and (min-width: 500px) {
    display: none;
  }
`;

const Header = () => {
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate();

  return (
    <Common>
      <Home href="/">ZZAZO</Home>

      <NavbarItemList menu={menu}>
        <NavItem href="/">약속잡기</NavItem>
        <NavItem href="/">공유일정확인</NavItem>
        <NavItem onClick={() => navigate("/mypage")}>마이페이지</NavItem>
        <NavItem href="/">누구님</NavItem>
        <NavItem href="/">로그아웃</NavItem>
      </NavbarItemList>
      <Menubar
        href="#"
        onClick={() => {
          setmenu(!menu);
        }}
      >
        <IoIosMenu></IoIosMenu>
      </Menubar>
    </Common>
  );
};

export default Header;
