import React from "react";
import styled from "styled-components";
import { Wrapper } from "../styled/Wrapper";

const Common = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(192, 240, 176, 0.5);
`;

const Home = styled.a`
  display : flex;
  align-itmes:center;
  font-size:2.5rem;
  margin 1rem;
  text-decoration: none;
  color: black;
  font-weight: bold;
`;

const NavbarItemList = styled.div`
  display: flex;
  align-itmes: center;
`;

const NavItem = styled.a`
  margin: 2rem;
  text-decoration: none;
  color: black;
`;

const Navbar = () => {
  return (
    <Common>
      <Home href="/">ZZAZO</Home>

      <NavbarItemList>
        <NavItem href="/">약속잡기</NavItem>
        <NavItem href="/">공유일정확인</NavItem>
        <NavItem href="/">마이페이지</NavItem>
        <NavItem href="/">누구님</NavItem>
        <NavItem href="/">로그아웃</NavItem>
      </NavbarItemList>
    </Common>
  );
};

export default Navbar;
