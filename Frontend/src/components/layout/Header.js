import React, { useState } from "react";
import styled from "styled-components";
import { IoIosMenu } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeLogin, storeLogout } from "../../store/reducers/user";
import { logout } from "../../api/AuthAPI";

const Common = styled.div`
  padding-left: 2rem;
  padding-right: 4rem;
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  background-color: white;
  height: 6rem;
  z-index: 2001;
  @media screen and (max-width: 500px) {
    z-index: 2020;
    flex-direction: column;
    height: 6rem;
    right: 1%;
    margin-right: -20%;
    transition: all 1s;
    right: 1%;
    margin-right: -20%;
  }
`;

const NavbarItemList = styled.div`
  display: flex;
  align-items: center;
  transition: all 1s;
  @media screen and (max-width: 500px) {
    background-color: white;

    flex-direction: column;
    align-items: flex-end;
    margin-top: 6rem;
    background-color: white;
    display: ${({ menu }) => {
      return menu === false ? "none" : "flex";
    }};
    margin-left: -2rem;
    padding-left: 13rem;
  }
`;

const NavItem = styled.a`
  &:hover {
    transform: scale(1.2);
  }
  cursor: pointer;
  text-shadow: 2px 1px 1px #b7e769;
  margin-right: 5rem;
  padding-right: 3rem;
  font-size: 1.1rem;

  text-decoration: none;
  font-weight: bold;
  color: black;
  @media screen and (max-width: 1150px) {
    margin-right: 3rem;
  }
  @media screen and (max-width: 1050px) {
    margin-right: 2rem;
    padding-right: 2rem;
  }
  @media screen and (max-width: 900px) {
    margin-right: 2rem;
    padding-right: 1rem;
  }
  @media screen and (max-width: 750px) {
    margin-right: 1.5rem;
    padding-right: 1.5rem;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 630px) {
    margin-right: 1.5rem;
    padding-right: 1rem;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 595px) {
    margin-right: 2rem;
    padding-right: 1rem;
    font-size: 0.8rem;
    font-size: 0.5rem;
  }
  @media screen and (max-width: 540px) {
    margin-right: 1rem;
    padding-right: 1rem;
    font-size: 0.8rem;
    font-size: 0.5rem;
  }
  @media screen and (max-width: 500px) {
    margin-right: 5rem;
    font-size: 1.1rem;
    text-align: right;
    margin-bottom: 3rem;
    padding-right: 4rem;
    padding-left: 12rem;
    width: 6rem;
  }
`;

const NicknameItem = styled.a`
  &:hover {
    transform: scale(1.2);
  }
  cursor: pointer;
  text-shadow: 2px 1px 1px #b7e769;
  margin-right: 5rem;
  padding-right: 3rem;
  font-size: 1.1rem;

  text-decoration: none;
  font-weight: bold;
  color: black;
  @media screen and (max-width: 1150px) {
    margin-right: 3rem;
  }
  @media screen and (max-width: 1050px) {
    margin-right: 2rem;
    padding-right: 2rem;
  }
  @media screen and (max-width: 900px) {
    margin-right: 1rem;
    padding-right: 1rem;
  }
  @media screen and (max-width: 750px) {
    margin-right: 1.5rem;
    padding-right: 1rem;
    font-size: 0.8rem;
  }
  @media screen and (max-width: 595px) {
    margin-right: 0.5rem;
    padding-right: 1rem;
    font-size: 0.5rem;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

const Menubar = styled.a`
  display: none;
  @media screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    font-size: 2.5rem;
    position: absolute;
    margin-top: 2rem;
    margin-left: 18rem;
    height: 2rem;
  }
`;

const ImgWrapper = styled.img`
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  cursor: pointer;
  @media screen and (max-width: 500px) {
    position: fixed;
    width: 4rem;
    height: 4rem;
    margin-right: 0.8rem;
    padding-top: 1.3rem;
    padding-right: 22rem;
  }
  @media screen and (max-width: 410px) {
    padding-left: 15%;
  }
  @media screen and (max-width: 390px) {
    padding-left: 20%;
  }
`;

const Header = () => {
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //loginUser정보
  const user = useSelector((state) => state.user.value);
  const currUserisLogin = user.isLogin; //로그인 여부
  const loginUser = user.data ? user.data : "";
  //console.log(loginUser);
  const nickname = loginUser.userNickName ? loginUser.userNickName : "";

  //data.UserEmail

  const onHandleLogOut = () => {
    dispatch(storeLogout());
    navigate("/");
  };

  return (
    <Common>
      <ImgWrapper onClick={() => navigate("/")} width="5rem" height="4rem" src={`${process.env.PUBLIC_URL}/assets/ZZAZOLOGO.png`}></ImgWrapper>
      <NavbarItemList menu={menu}>
        {currUserisLogin ? (
          <>
            <NavItem onClick={() => navigate("/plan")}>약속잡기</NavItem>
            <NavItem onClick={() => navigate("/plancalendar")}>공유일정확인</NavItem>
            <NavItem onClick={() => navigate("/mypage")}>마이페이지</NavItem>
            <NicknameItem>{nickname ? nickname : ""}님 환영합니다.</NicknameItem>
            <NavItem onClick={() => onHandleLogOut()}>로그아웃</NavItem>
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
