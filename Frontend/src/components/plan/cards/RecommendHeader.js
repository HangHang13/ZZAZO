import React from "react";
import styled from "styled-components";
import { PlanHeaderWrapper } from "../../styled/Wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const InformMark = styled.div`
	display: flex;
	width: 20%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const InformMent = styled.div`
	display: flex;
	width: 50%;
	height: 100%;
	align-items: center;

	@media screen and (max-width: 1536px) {
		font-size: 0.9rem;
	}
	@media screen and (max-width: 1280px) {
		font-size: 0.8rem;
	}
	@media screen and (max-width: 1024px) {
		font-size: 0.7rem;
	}
	@media screen and (max-width: 500px) {
		font-size: 0.9rem;
	}
`;

const ReloadButtonWrapper = styled.div`
	display: flex;
	width: 30%;
	height: 100%;
	align-items: center;
	justify-content: center;

	@media screen and (max-width: 500px) {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}
`;

const ReloadImg = styled.img`
	display: flex;
	transition: all ease 1s;
	&:active {
		transform: rotate(1440deg);
	}
`;

const RecommendHeader = ({ onHandleReload }) => {
	return (
		<PlanHeaderWrapper flexDirection="row" height="80px">
			<InformMark>
				<FontAwesomeIcon icon={faCircleInfo} size="2x" />
			</InformMark>
			<InformMent>고객님과 유사한 사용자의 기록을 바탕으로 장소를 추천합니다.</InformMent>
			<ReloadButtonWrapper>
				<ReloadImg src={`${process.env.PUBLIC_URL}/assets/plan/reload.png`} alt="새로고침" onClick={onHandleReload} />
			</ReloadButtonWrapper>
		</PlanHeaderWrapper>
	);
};

export default RecommendHeader;
