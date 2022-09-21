import React, { useState } from "react";
import Header from "./../../components/layout/Header";
import { BaseFlexWrapper, PlanPageWrapper } from "./../../components/styled/Wrapper";
import styled from "styled-components";
import Radius from "../../components/plan/radius_bar/Radius";
import { useSelector } from "react-redux";
import PlanHeader from "./../../components/plan/cards/PlanHeader";
import PlanList from "./../../components/plan/cards/PlanList";
import AuthButton from "./../../components/common/buttons/AuthButton";

const PageHeaderBlock = styled.div`
	display: flex;
	flex-direciton: column;
	align-items: start;
	width: 100%;
	height: 10vh;
	margin-top: 1rem;

	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
`;

const PlanBlock = styled.div`
	display: flex;
	flex-direciton: column;
	background-color: ${({ bg }) => bg};
	align-items: start;
	justify-content: ${({ justifyContent }) => justifyContent};
	width: 100%;
	height: 65vh;
	margin-top: ${({ marginTop }) => marginTop};
	margin-bottom: 2rem;

	@media screen and (max-width: 500px) {
		margin-top: 3rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		height: auto;
	}
`;

const Title = styled.h1`
	font-size: 3rem;
	font-weight: bold;
	color: #80c0a0;
	padding: 0 1rem 0.5rem 1rem;
	border-bottom: 3px solid #c0f0e0;
	min-width: 280px;

	@media screen and (max-width: 400px) {
		font-size: 2.5rem;
	}
	@media screen and (max-width: 350px) {
		font-size: 2rem;
		padding: 0 0.5rem 0.25rem 0.5rem;
	}
`;

const TrashCan = styled.div`
	display: flex;
	position: absolute;
	right: 7%;
	width: 6rem;

	&:after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}
	.trash {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	@media screen and (max-width: 500px) {
		top: calc(11rem);
		width: 4rem;
	}
`;

const MapWrapper = styled.div`
	display: flex;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	border: 1px solid black;

	@media screen and (max-width: 4096px) {
		height: calc(100% - 6rem);
	}
	@media screen and (max-width: 1024px) {
		height: calc(100% - 4rem);
	}
	@media screen and (max-width: 500px) {
		height: 25vh;
	}
`;

MapWrapper.defaultProps = {
	width: "70%",
	height: "100%",
	boxShadow: "2px 0 4px 0 #303030",
};

const PlanMakeWrapper = styled.div`
	// background-color: aqua;
	display: flex;
	flex-direction: column;
	width: ${({ width }) => width};
	height: 100%;
	user-select: none;

	@media screen and (max-width: 500px) {
		width: 100%;
		margin-top: 1rem;
	}
`;

const RadiusWrapper = styled.div`
	backgroud-color: green;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 6rem;

	@media screen and (max-width: 1024px) {
		height: 4rem;
	}
	@media screen and (max-width: 500px) {
		height: 3rem;
	}
`;

const RadiusButton = styled.button`
	background-color: #80e080;
	width: 64px;
	height: 50%;
	margin-right: 2rem;
	border: 1px solid #80c0a0;
	border-radius: 8px;
	font-size: 1.1rem;
	font-weight: bold;

	@media screen and (max-width: 500px) {
		font-size: 1rem;
		height: 80%;
	}
`;

const SectionTitle = styled.div`
	display: flex;
	width: ${({ width }) => width};
	height: 3rem;
	line-height: 3rem;
	border: none;
	border-radius: 8px;
	background-color: ${({ bg }) => bg};
	font-size: 1.5rem;
	font-weight: bold;
	text-align: center;
	align-items: center;
	justify-content: center;
	user-select: none;
	margin-bottom: 0.2rem;

	@media screen and (max-width: 640px) {
		font-size: 1.2rem;
	}
	@media screen and (max-width: 500px) {
		font-size: 1.5rem;
	}
`;

SectionTitle.defaultProps = {
	width: "100%",
	bg: "#80e080",
};

const PlanCard = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	bottom: 0px;
	width: 100%;
	height: calc(100%);
	box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.25);

	@media screen and (max-width: 500px) {
		height: ${({ mWidth }) => mWidth};
		margin-bottom: 0.5rem;
	}
`;

const Plan_Copy = () => {
	const [trashToggle, setTrashToggle] = useState(false);
	const [recommendListToggle, setRecommendListToggle] = useState(true);
	const radius = useSelector((state) => state.radius.value);

	// 반경 기준으로 장소 리스트 요청 함수
	const onHandleRadius = () => {
		console.log(radius);
	};

	// [추천리스트, 전체리스트] 버튼 누를 시 이벤트
	const onHandleChangeList = (toggle) => {
		setRecommendListToggle(toggle);
	};

	// 장소 상세보기 모달창 띄우기
	const openModal = (pId) => {
		console.log(pId);
	};

	return (
		<div align="center">
			<Header />
			<PlanPageWrapper width="90vw">
				<PageHeaderBlock height="calc(20vh)" bg="yellow">
					<Title>약속 카드 생성</Title>
					{/* 휴지통 */}
					<TrashCan onMouseOver={() => setTrashToggle(true)} onMouseLeave={() => setTrashToggle(false)}>
						<img
							className="trash"
							src={!trashToggle ? `${process.env.PUBLIC_URL}/assets/plan/trash_close.png` : `${process.env.PUBLIC_URL}/assets/plan/trash_open.png`}
							alt="휴지통"
							width="100%"
						/>
					</TrashCan>
				</PageHeaderBlock>
				<PlanBlock justifyContent="space-between">
					<PlanMakeWrapper width="calc(50% - 1rem)">
						{/* 반경 */}
						<RadiusWrapper>
							<Radius />
							<RadiusButton onClick={onHandleRadius}>입력</RadiusButton>
						</RadiusWrapper>
						{/* 카카오맵 */}
						<MapWrapper mapName="make" width="100%">
							여기에 카카오맵
						</MapWrapper>
					</PlanMakeWrapper>
					{/* 추천 목록, 전체 목록 */}
					<PlanMakeWrapper width="calc(25% - 1rem)">
						<BaseFlexWrapper>
							<SectionTitle width="50%" bg={recommendListToggle ? "#80E080" : "#D9D9D9"} onClick={() => onHandleChangeList(true)}>
								추천
							</SectionTitle>
							<SectionTitle width="50%" bg={!recommendListToggle ? "#80E080" : "#D9D9D9"} onClick={() => onHandleChangeList(false)}>
								목록
							</SectionTitle>
						</BaseFlexWrapper>
						<PlanCard mWidth="50vh">추천 리스트</PlanCard>
					</PlanMakeWrapper>
					{/* 약속 카드 */}
					<PlanMakeWrapper width="calc(25% - 1rem)">
						<SectionTitle width="100%">약 속 카 드</SectionTitle>
						<PlanCard mWidth="50vh">
							<PlanHeader />
							<PlanList openModal={openModal} />
						</PlanCard>
					</PlanMakeWrapper>
				</PlanBlock>
				<AuthButton message="약속 저장하기" />
			</PlanPageWrapper>
		</div>
	);
};

export default Plan_Copy;
