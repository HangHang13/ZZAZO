import React, { useState } from "react";
import Header from "./../../components/layout/Header";
import { BaseFlexWrapper, PlanPageWrapper } from "./../../components/styled/Wrapper";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FullPage } from "react-full-page/lib";
import { Slide } from "react-full-page";
import Radius from "../../components/plan/radius_bar/Radius";
import { useSelector } from "react-redux";

const PlanBlock = styled.div`
	display: flex;
	flex-direciton: column;
	background-color: ${({ bg }) => bg};
	align-items: start;
	justify-content: ${({ justifyContent }) => justifyContent};
	width: 100%;
	height: ${({ height }) => height};
	margin-top: ${({ marginTop }) => marginTop};

	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: start;
		justify-content: center;
	}
`;

PlanBlock.defaultProps = {
	height: "8rem",
	bg: "white",
};

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
		top: calc(100vh + 6rem);
		width: 4rem;
	}
`;

const MapWrapper = styled.div`
	display: flex;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	box-shadow: ${({ boxShadow }) => boxShadow};

	&:first-child: {
		@media screen and (max-width: 1000px) {
			width: 65%;
		}
		@media screen and (max-width: 800px) {
			width: 60%;
		}
		@media screen and (max-width: 500px) {
			display: block;
			width: 100%;
			height: 40%;
		}
	}

	&:last-child: {
		@media screen and (max-width: 4096px) {
			height: calc(100% - 6rem);
		}
		@media screen and (max-width: 1024px) {
			height: calc(100% - 4rem);
		}
		@media screen and (max-width: 500px) {
			height: calc(100% - 3rem);
		}
	}
`;

MapWrapper.defaultProps = {
	width: "70%",
	height: "100%",
	boxShadow: "2px 0 4px 0 #303030",
};

const ListWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 30%;
	height: 100%;
	box-shadow: 2px 0 4px 0 #303030;

	@media screen and (max-width: 1000px) {
		width: 35%;
	}
	@media screen and (max-width: 800px) {
		width: 40%;
	}
	@media screen and (max-width: 500px) {
		display: block;
		width: 100%;
		height: 60%;
	}
`;

const MainPlaceInputWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: white;
	width: 90%;
	height: 2.5rem;
	border-radius: 8px;
	border: none;
	margin-top: 1rem;
	filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.25));
`;

const MainPlaceSearchButton = styled.button`
	position: relative;
	height: 100%;
	width: 15%;
	background-color: white;
	border: none;
	border-radius: 8px;
`;

const MainPlaceInput = styled.input`
	display: flex;
	width: 80%;
	height: 100%;
	line-height: 100%;
	border: none;
	border-radius: 8px;
	outline: none;
	font-size: 1rem;
	fone-weight: bold;
`;

const PlanMakeWrapper = styled.div`
	background-color: aqua;
	display: flex;
	flex-direction: column;
	width: ${({ width }) => width};
	height: 90%;

	@media screen and (max-width: 500px) {
		width: 100%;
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
	margin-bottom: 1rem;
	user-select: none;
`;

SectionTitle.defaultProps = {
	width: "100%",
	bg: "#80e080",
};

const PlanCard = styled.div`
	background-color: pink;
	display: flex;
	position: relative;
	bottom: 0px;
	width: 100%;
	height: calc(100% - 4rem);
	box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.25);
`;

const Plan_Copy = () => {
	const [headerOn, setHeaderOn] = useState(false);
	const [trashToggle, setTrashToggle] = useState(false);
	const [recommendListToggle, setRecommendListToggle] = useState(true);
	const radius = useSelector((state) => state.radius.value);

	// 헤더 켰다 껐다
	const headerShowHandler = () => {
		setHeaderOn(!headerOn);
	};

	// 반경 기준으로 장소 리스트 요청 함수
	const onHandleRadius = () => {
		console.log(radius);
	};

	// [추천리스트, 전체리스트] 버튼 누를 시 이벤트
	const onHandleChangeList = (toggle) => {
		setRecommendListToggle(toggle);
	};

	return (
		<div align="center">
			<FullPage beforeChange={headerShowHandler}>
				<Slide>
					{headerOn && <Header />}
					<PlanPageWrapper width="90vw">
						<PlanBlock height="calc(25vh - 4rem)">
							<Title>약속 장소 선택</Title>
						</PlanBlock>
						<PlanBlock height="calc(75vh - 4rem)" justifyContent="space-between">
							{/* 카카오맵 구현 부분 */}
							<MapWrapper></MapWrapper>
							{/* 장소 리스트 구현 부분 */}
							<ListWrapper>
								<MainPlaceInputWrapper>
									<MainPlaceSearchButton>
										<FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
									</MainPlaceSearchButton>
									<MainPlaceInput placeholder="약속장소 입력" />
								</MainPlaceInputWrapper>
							</ListWrapper>
						</PlanBlock>
					</PlanPageWrapper>
				</Slide>
				<Slide>
					<PlanPageWrapper width="90vw">
						<PlanBlock height="calc(20vh)" marginTop="-6rem">
							<Title>약속 카드 생성</Title>
							{/* 휴지통 */}
							<TrashCan onMouseOver={() => setTrashToggle(true)} onMouseLeave={() => setTrashToggle(false)}>
								<img
									className="trash"
									src={
										!trashToggle ? `${process.env.PUBLIC_URL}/assets/plan/trash_close.png` : `${process.env.PUBLIC_URL}/assets/plan/trash_open.png`
									}
									alt="휴지통"
									width="100%"
								/>
							</TrashCan>
						</PlanBlock>
						<PlanBlock height="calc(75vh)" justifyContent="space-between" bg="beige">
							<PlanMakeWrapper width="calc(50% - 1rem)">
								{/* 반경 */}
								<RadiusWrapper>
									<Radius />
									<RadiusButton onClick={onHandleRadius}>입력</RadiusButton>
								</RadiusWrapper>
								{/* 카카오맵 */}
								<MapWrapper mapName="make" width="100%">
									여기에 카카오맵 넣어주세요
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
								<PlanCard>추천 리스트</PlanCard>
							</PlanMakeWrapper>
							{/* 약속 카드 */}
							<PlanMakeWrapper width="calc(25% - 1rem)">
								<SectionTitle width="100%">약 속 카 드</SectionTitle>
								<PlanCard>약속카드 리스트</PlanCard>
							</PlanMakeWrapper>
						</PlanBlock>
					</PlanPageWrapper>
				</Slide>
			</FullPage>
		</div>
	);
};

export default Plan_Copy;
