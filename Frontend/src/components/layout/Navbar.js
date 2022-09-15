import React, { useState } from "react";
import styled from "styled-components";
import { IoIosMenu } from "react-icons/io";

const Common = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  background-color: rgba(192, 240, 176, 0.5);
  @media screen and (max-width: 700px) {
    flex-direction: column;
    background-color: rgba(192, 240, 176, 0.5);
  }
`;

const Home = styled.a`
    display: flex;
    align-items:center;
    font-size: 30px;
    margin 10px;
    text-decoration: none;
    color: black;
    font-weight: bold;
    @media screen and (max-width: 700px) {
    display: none;
    }
`;

const NavbarItemList = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: flex-end;
    display: ${({ menu }) => {
      return menu === false ? "none" : "flex";
    }};
  }
`;

const NavItem = styled.a`
  margin: 2rem;
  text-decoration: none;
  color: black;
`;

const Menubar = styled.a`
  display: flex;
  align-items: center;
  font-size: 30px;
  position: absolute;
  right: 32px;
  height: 97px;
  @media screen and (min-width: 700px) {
    display: none;
  }
`;

const Navbar = () => {
  const [menu, setmenu] = useState(false);

  return (
    <Common>
      <Home href="/">ZZAZO</Home>

      <NavbarItemList menu={menu}>
        <NavItem href="/">약속잡기</NavItem>
        <NavItem href="/">공유일정확인</NavItem>
        <NavItem href="/">마이페이지</NavItem>
        <NavItem href="/">누구님</NavItem>
        <NavItem href="/">로그아웃</NavItem>
      </NavbarItemList>
      <Menubar
        href="#"
        onClick={() => {
          setmenu(!menu);
        }}
      >
        <IoIosMenu />
      </Menubar>
    </Common>
  );
};

export default Navbar;
