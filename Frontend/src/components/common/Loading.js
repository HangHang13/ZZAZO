import React from "react";
import styled from "styled-components";

const Background = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background: #ffffffb7;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const LoadingText = styled.div`
	font: 1rem "Noto Sans KR";
	text-align: center;
`;

const LoadingImg = styled.img`
	width: 5%;
	@media screen and (max-width: 1024px) {
		width: 10%;
	}
	@media screen and (max-width: 500px) {
		width: 20%;
	}
`;

const Loading = () => {
	return (
		<Background>
			<LoadingImg src={`${process.env.PUBLIC_URL}/assets/common/spinner.gif`} alt="로딩중" />
		</Background>
	);
};

export default Loading;
