import React, { useEffect, useState } from "react";
import Header from "./../../components/layout/Header";
import { BaseFlexWrapper, PlanPageWrapper } from "./../../components/styled/Wrapper";
import styled from "styled-components";
import Slider from "../../components/plancalendar/Slider";
import EmptyPlan from "./../../components/plancalendar/EmptyPlan";
import { Wrapper } from "../../components/styled/Wrapper";
import { getMyPlan, getPlan, getPlanList } from "../../api/PlanAPI";
import Loading from "./../../components/common/Loading";

const PageHeaderBlock = styled.div`
	display: flex;
	flex-direciton: column;
	align-items: start;
	width: 100%;
	height: ${({ height }) => height};
	margin-top: 1rem;

	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
`;

const Title = styled.h1`
	display: flex;
	position: relative;
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

const MapWrapper = styled.div`
	display: flex;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	min-height: 300px;
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

const SearchWrapper = styled.div`
	margin-bottom: 1.5rem;
	border-radius: 50px;
	width: 50rem;
	height: 5rem;
	background-color: #c0f0b0;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	box-shadow: 4px 2px 2px grey;
	@media screen and (max-width: 860px) {
		width: 40rem;
		height: 4rem;
	}
	@media screen and (max-width: 690px) {
		width: 32rem;
		height: 4rem;
	}
	@media screen and (max-width: 500px) {
		width: 25rem;
		height: 3rem;
	}
`;

const SearchOption = styled.select`
	width: 10rem;
	border-radius: 16px;
	height: 2.5rem;
	font-size: 1.5rem;
	box-shadow: 4px 2px 2px grey;
	@media screen and (max-width: 860px) {
		width: 8rem;
		height: 2.5rem;
	}
	@media screen and (max-width: 690px) {
		width: 6rem;
	}
	@media screen and (max-width: 500px) {
		height: 2rem;
		width: 5rem;
	}
`;

const SearchInput = styled.input`
	width: 30rem;
	border-radius: 16px;
	height: 2.5rem;
	font-size: 1.5rem;
	box-shadow: 4px 2px 2px grey;
	@media screen and (max-width: 860px) {
		width: 25rem;
		height: 2.5rem;
	}
	@media screen and (max-width: 690px) {
		width: 20rem;
	}
	@media screen and (max-width: 500px) {
		height: 2rem;
		width: 15rem;
	}
`;
const SearchIcon = styled.img`
	width: 2.5rem;
	height: 2.5rem;
	@media screen and (max-width: 500px) {
		width: 1.5rem;
		height: 1.5rem;
	}
`;

const PlanCalendar = () => {
	// Constants
	const LOADING_DEFAULT = "약속 일정을 불러오는 중입니다...";

	// States
	const [loading, setLoading] = useState(false);
	const [loadingText, setLoadingText] = useState(LOADING_DEFAULT);
	const [userPlan, setuserPlan] = useState([]); // 유저의 플랜리스트

	// 초기 데이터 정제
	const plancardLoad = async () => {
		// 약속카드 리스트 불러온다
		const response = await getPlanList();

		if (response.data.cards.length === 0) return;

		// 전체에 대해 수행
		let planCardList = [];
		let planCard = [];
		let nowCardId = response.data.cards[0].cardId;
		for (const placeCard of response.data.cards) {
			if (placeCard.cardId !== nowCardId) {
				nowCardId = placeCard.cardId;
				planCardList.push(planCard);
				planCard = [];
			}
			planCard.push(placeCard);
		}
		planCardList.push(planCard);
		setuserPlan(planCardList);
		console.log(planCardList);
	};

	// useEffects
	useEffect(() => {
		window.scrollTo(0, 0);
		setLoading(true);
		plancardLoad();
		reviewLoad();
		setLoading(false);
	}, []);

	return (
		<>
			<Header />
			{loading ? <Loading text={loadingText} /> : null}
			<Wrapper>
				<div align="center">
					<PlanPageWrapper width="90vw">
						<PageHeaderBlock height="10vh" bg="yellow">
							<Title>공유 일정 확인</Title>
						</PageHeaderBlock>
					</PlanPageWrapper>
					{userPlan ? (
						<>
							<Slider placeList={userPlan} />
						</>
					) : (
						<EmptyPlan></EmptyPlan>
					)}
				</div>
			</Wrapper>
		</>
	);
};

export default PlanCalendar;
