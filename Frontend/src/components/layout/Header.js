import React, { useState } from "react";
import styled from "styled-components";
import { IoIosMenu } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeLogin, storeLogout } from "../../store/reducers/user";

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
	z-index: 10;
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
	margin-right: 5rem;
	padding-right: 3rem;
	font-size: 1.1rem;

	text-decoration: none;
	font-weight: bold;
	color: black;
	@media screen and (max-width: 500px) {
		margin: 0.5rem;
	}
`;

const Menubar = styled.a`
	display: none;
	@media screen and (max-width: 500px) {
		display: flex;
		align-items: center;
		font-size: 2.5rem;
		position: absolute;
		margin-top: 1rem;
		right: 2rem;
		height: 2rem;
	}
`;

const ImgWrapper = styled.img`
	display: flex;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
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
	const dispatch = useDispatch();
	//loginUser정보
	const user = useSelector((state) => state.user.value);
	const currUserisLogin = user.isLogin; //로그인 여부
	const loginUser = user.data ? user.data : "";
	//console.log(loginUser);
	const email = loginUser.userEmail ? loginUser.userEmail : "";

	//data.UserEmail

	const onHandleLogOut = () => {
		dispatch(storeLogout());
		navigate("/");
	};

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
