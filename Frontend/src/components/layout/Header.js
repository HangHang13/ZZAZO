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
  height: 12vh;
  box-shadow: 0 4px 4px -4px gray;

  @media screen and (max-width: 500px) {
    flex-direction: column;
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

const Header = () => {
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate();

  //loginUser정보
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const currUserisLogin = user.isLogin; //로그인 여부
  const loginUser = user.data ? user.data : "";
  //console.log(loginUser);
  const email = loginUser.userEmail ? loginUser.userEmail : "";

  //data.UserEmail

  return (
    <Common>
      <ImgWrapper onClick={() => navigate("/")} width="5rem" height="4rem" src="../assets/ZZAZOLOGO.png"></ImgWrapper>

      <NavbarItemList menu={menu}>
        {currUserisLogin ? (
          <>
            <NavItem href="/">약속잡기</NavItem>
            <NavItem href="/">공유일정확인</NavItem>
            <NavItem onClick={() => navigate("/mypage")}>마이페이지</NavItem>
            <NavItem>{email ? email : ""}님 환영합니다.</NavItem>
            <NavItem href="/">로그아웃</NavItem>
          </>
        ) : (
          <>
            <NavItem onClick={() => navigate("/signup")}>회원가입</NavItem>
            <NavItem onClick={() => navigate("/login")}>로그인</NavItem>
          </>
        )}
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
