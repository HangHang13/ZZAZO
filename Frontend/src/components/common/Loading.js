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

const Loading = () => {
	return (
		<Background>
			<img src={`${process.env.PUBLIC_URL}/assets/common/spinner.gif`} alt="로딩중" width="5%" />
		</Background>
	);
};

export default Loading;
