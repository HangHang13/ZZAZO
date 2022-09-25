import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { BaseFlexWrapper, ButtonWrapper, PlanPageWrapper } from "../../components/styled/Wrapper";
import styled, { keyframes } from "styled-components";
import Radius from "../../components/plan/radius_bar/Radius";
import { useSelector } from "react-redux";
import PlanHeader from "../../components/plan/cards/PlanHeader";
import PlanList from "../../components/plan/cards/PlanList";
import AuthButton from "../../components/common/buttons/AuthButton";
import moment from "moment";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SliderWrapper } from "../../components/styled/SliderWrapper";
import PlanInformHeader from "../../components/plan/cards/PlanInformHeader";
import { ListTypes } from "./../../constants/ListTypes";
import { getRecommendList } from "../../api/PlanAPI";

const BeforeButton = styled(ButtonWrapper)`
	position: absolute;
	animation: motion 0.5s linear infinite alternate;
	top: 7rem;
	margin-top: 0px;
	width: 240px;
	background-color: #80e080;
	border: 1px solid #80c0a0;
	box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);

	@keyframes motion {
		0% {
			margin-top: 0px;
		}
		100% {
			margin-top: 0.2rem;
		}
	}

	@media screen and (max-width: 500px) {
		width: 60vw;
		left: 2rem;
		top: 11.5rem;
	}
`;

const AfterButton = styled(ButtonWrapper)`
	display: flex;
	position: absolute;
	bottom: 3rem;
	width: 40%;
	background-color: #80e080;
	border: 1px solid #80c0a0;
	color: white;
	font-weight: bold;
	font-size: 1.3rem;
	box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

	@media screen and (max-width: 500px) {
		position: relative;
		margin-top: 2rem;
		margin-bottom: 2rem;
		padding: 2rem;
		width: 200px;
	}
`;

const PageHeaderBlock = styled.div`
	display: flex;
	flex-direciton: column;
	align-items: start;
	width: 100%;
	height: 10vh;
	margin-top: 1rem;

	@media screen and (max-width: 500px) {
		height: 30vh;
		margin-bottom: 2vh;
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
	right: 10%;
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
		right: 1rem;
		top: 10.5rem;
		width: 5rem;
	}
`;

const MapWrapper = styled.div`
	display: flex;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	min-height: 320px;
	border: 1px solid black;

	@media screen and (max-width: 4096px) {
		height: calc(100% - 6rem);
	}
	@media screen and (max-width: 1024px) {
		height: calc(100% - 4rem);
	}
	@media screen and (max-width: 500px) {
		height: 25vh;
		margin-bottom: -15vh;
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
	min-height: 200px;
	user-select: none;
	overflow-x: hidden;
	overflow-y: hidden;

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
	transition: 0.2s ease;

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
	min-height: 480px;
	box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.25);

	@media screen and (max-width: 500px) {
		height: ${({ mWidth }) => mWidth};
		margin-bottom: 0.5rem;
	}
`;

/* 휴지통에 대한 스타일 */
const Animate = keyframes`
	0%{
		transform: translateY(-80px);
		opacity: 0;
	}
	30%{
		opacity: 0.3;
	}
	60%{
		opacity: 0.6;
	}
	100%{
		transform: translateY(0px);
		opacity: 1;
	}
`;
const TrashWrapper = styled.div`
	background-color: yellow;
	display: ${({ display }) => display};
	position: absolute;
	right: 148px;
	top: 200px;
	width: 300px;
	height: 600px;
	overflow-y: scroll;
	z-index: 100;
	border-radius: 16px;
	background-color: rgba(38, 38, 38, 0.6);

	animation-duration: 0.3s;
	animation-timing-function: ease-out;
	animation-name: ${Animate};
	animation-fill-mode: forwards;

	@media screen and (max-width: 500px) {
		right: 8px;
		top: 228px;
		height: 50%;
	}
`;
TrashWrapper.defaultProps = {
	display: "flex",
};

const PlanMakeCard = () => {
	const location = useLocation(); // location.state.content, location.state.position
	const navigate = useNavigate();

	// States_공통
	const [start, setStart] = useState(100); // 화면 슬라이딩 효과를 위한 state
	const [end, setEnd] = useState(5); // 화면 슬라이딩 효과를 위한 state

	// States_추천/목록 리스트
	const [recommendListToggle, setRecommendListToggle] = useState(true); // [추천,목록] 메뉴 토글
	const radius = useSelector((state) => state.radius.value); // 반경
	const [recommendList, setRecommendList] = useState([]);

	// States_약속카드 리스트
	const [planInfo, setPlanInfo] = useState({
		name: "",
		date: "",
		time: "00:00",
	});
	const [planList, setPlanList] = useState([]);

	// States_휴지통 리스트
	const [trashList, setTrashList] = useState([]); // 휴지통 리스트
	const [trashToggle, setTrashToggle] = useState(false); // 휴지통 토글

	// useEffects
	useEffect(async () => {
		// 화면 제일 위에서 시작
		window.scrollTo(0, 0);

		// 약속카드 리스트에 메인 장소 설정
		setPlanList([
			{
				placeName: location.state.content.placename,
				placeAddress: location.state.content.addressname,
				lat: location.state.position.lat,
				lng: location.state.position.lng,
				isMain: true,
			},
		]);

		setRecommendList([
			{
				placeId: 2,
				placeName: "땀땀",
				placeAddress: "서울 강남구 강남대로98길 12-5",
				placeScore: 3.4,
				placeType: "음식점",
				isMain: false,
			},
			{
				placeId: 17453,
				placeName: "CGV 강남",
				placeAddress: "서울 강남구 강남대로 438 스타플렉스",
				placeScore: 3.3,
				placeType: "영화관",
			},
			{
				placeId: 456,
				placeName: "스타벅스 강남대로점",
				placeAddress: "서울 강남구 강남대로 456 한석타워 2층 1-2호",
				placeScore: 4.2,
				placeType: "커피전문점",
			},
			{
				placeId: 15346,
				placeName: "멀티캠퍼스 역삼",
				placeAddress: "서울 강남구 테헤란로 212",
				placeScore: 5.0,
				placeType: "학원",
			},
			{
				placeId: 111,
				placeName: "나나나 짜장면",
				placeAddress: "서울 강남구 강남대로98길 12-5",
				placeScore: 3.4,
				placeType: "음식점",
				isMain: false,
			},
			{
				placeId: 88,
				placeName: "강남 유명한 방탈출카페",
				placeAddress: "서울 강남구 강남대로 438 스타플렉스",
				placeScore: 3.3,
				placeType: "테마카페",
			},
			{
				placeId: 3,
				placeName: "투썸플레이스 강남점",
				placeAddress: "서울 강남구 강남대로 456 한석타워 2층 1-2호",
				placeScore: 4.2,
				placeType: "커피전문점",
			},
			{
				placeId: 4,
				placeName: "카페지즈",
				placeAddress: "서울 강남구 강남대로 134",
				placeScore: 4.5,
				placeType: "커피전문점",
			},
			{
				placeId: 5,
				placeName: "와타빈",
				placeAddress: "서울 강남구 강남대로 1334",
				placeScore: 4.5,
				placeType: "체험장",
			},
		]);

		const response = await getRecommendList({
			longitude: parseFloat(location.state.position.lng),
			latitude: parseFloat(location.state.position.lat),
		});
	}, []);

	// 반경 기준으로 장소 리스트 요청 함수
	const onHandleRadius = () => {
		console.log(radius);
	};

	// [추천리스트, 목록리스트] 버튼 누를 시 이벤트
	const onHandleChangeList = (toggle) => {
		setRecommendListToggle(toggle);
	};

	// 장소 상세보기 모달창 띄우기
	const openModal = (pId) => {
		console.log(pId);
	};

	const onHandleName = (e) => {
		setPlanInfo({ ...planInfo, name: e.target.value });
	};

	const onHandleDate = (value) => {
		setPlanInfo({ ...planInfo, date: moment(value).format("YYYY-MM-DD") });
		console.log(planInfo);
	};

	const onHandleTime = (e) => {
		setPlanInfo({ ...planInfo, time: e.target.value });
	};

	// +, - 버튼 누를 시 이벤트
	const onHandleList = (listType, index) => {
		const arr1 = Array.from(recommendList);
		const arr2 = Array.from(planList);
		const arr3 = Array.from(trashList);
		if (listType === ListTypes.RECOMMEND) {
			arr2.push(arr1[index]);
			arr1.splice(index, 1);
		} else if (listType === ListTypes.PLAN) {
			arr3.push(arr2[index]);
			arr2.splice(index, 1);
		} else if (listType === ListTypes.TRASH) {
			arr2.push(arr3[index]);
			arr3.splice(index, 1);
		}
		setRecommendList(arr1);
		setPlanList(arr2);
		setTrashList(arr3);
	};

	return (
		<div align="center">
			<Header />
			<SliderWrapper leftStart={start} leftEnd={end}>
				<PlanPageWrapper width="90vw">
					<BeforeButton
						onClick={() => {
							setStart(end);
							setEnd(100);
							setTimeout(() => navigate("/plan"), 400);
						}}
					>
						약속장소 다시 선택하기
					</BeforeButton>
					<PageHeaderBlock height="calc(20vh)">
						<Title>약속 카드 생성</Title>
						{/* 휴지통 */}
						<TrashCan onClick={() => setTrashToggle(!trashToggle)}>
							<img
								className="trash"
								src={!trashToggle ? `${process.env.PUBLIC_URL}/assets/plan/trash_close.png` : `${process.env.PUBLIC_URL}/assets/plan/trash_open.png`}
								alt="휴지통"
								width="100%"
							/>
						</TrashCan>
						<TrashWrapper display={trashToggle ? "flex" : "none"}>
							<PlanList pList={trashList} setPList={setTrashList} openModal={openModal} listType={ListTypes.TRASH} onHandleList={onHandleList} />
						</TrashWrapper>
					</PageHeaderBlock>
					<PlanBlock justifyContent="space-between">
						<PlanMakeWrapper width="calc(50% - 1rem)">
							{/* 반경 */}
							<RadiusWrapper>
								<Radius />
								<RadiusButton onClick={onHandleRadius}>입력</RadiusButton>
							</RadiusWrapper>
							{/* 카카오맵 */}
							<MapWrapper mapName="make" width="100%" height="100%">
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
							<PlanCard mWidth="50vh">
								<PlanInformHeader />
								<PlanList
									pList={recommendList}
									setPList={setRecommendList}
									openModal={openModal}
									onHandleList={onHandleList}
									listType={ListTypes.RECOMMEND}
								/>
							</PlanCard>
						</PlanMakeWrapper>
						{/* 약속 카드 */}
						<PlanMakeWrapper width="calc(25% - 1rem)">
							<SectionTitle width="100%">약 속 카 드</SectionTitle>
							<PlanCard mWidth="50vh">
								<PlanHeader dateValue={planInfo.date} onHandleName={onHandleName} onHandleDate={onHandleDate} onHandleTime={onHandleTime} />
								<PlanList pList={planList} setPList={setPlanList} openModal={openModal} onHandleList={onHandleList} listType={ListTypes.PLAN} />
							</PlanCard>
						</PlanMakeWrapper>
					</PlanBlock>
					<AfterButton>약속 저장하기</AfterButton>
				</PlanPageWrapper>
			</SliderWrapper>
		</div>
	);
};

export default PlanMakeCard;
