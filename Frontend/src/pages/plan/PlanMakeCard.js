import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { BaseFlexWrapper, ButtonWrapper, PlanPageWrapper, Wrapper } from "../../components/styled/Wrapper";
import styled, { keyframes } from "styled-components";
import Radius from "../../components/plan/radius_bar/Radius";
import { useSelector } from "react-redux";
import PlanHeader from "../../components/plan/cards/PlanHeader";
import PlanList from "../../components/plan/cards/PlanList";
import moment from "moment";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SliderWrapper } from "../../components/styled/SliderWrapper";
import RecommendHeader from "../../components/plan/cards/RecommendHeader";
import { ListTypes } from "./../../constants/ListTypes";
import { getPlaceList, getRecommendList } from "../../api/PlanAPI";
import MapContainer from "./../../components/kakaomap/MapContainer";
import Loading from "./../../components/common/Loading";
import CardDetail from "../../components/locationdetail/CardDetail";
import ListHeader from "../../components/plan/cards/ListHeader";

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
	bottom: 2rem;
	width: 40%;
	background-color: #80e080;
	border: 1px solid #80c0a0;
	color: white;
	font-weight: bold;
	font-size: 1.3rem;
	box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
	z-index: 1000;

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
	right: 0%;
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
		width: 100%;
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

const TrashWrapper = styled.div`
	background-color: yellow;
	display: ${({ display }) => display};
	position: absolute;
	right: 0px;
	top: 200px;
	width: 360px;
	height: ${({ height }) => height};
	overflow-y: hidden;
	overflow-x: hidden;
	z-index: 100;
	border-radius: 16px;
	background-color: rgba(38, 38, 38, 0.6);

	transition: 0.3s ease-in;

	@media screen and (max-width: 500px) {
		right: 8px;
		top: 228px;
		height: ${({ mHeight }) => mHeight};
		width: 80%;
	}
`;
TrashWrapper.defaultProps = {
	display: "flex",
};

const PlanMakeCard = () => {
	const ELEMENTS_PER_PAGE = 5;

	const location = useLocation(); // location.state.content, location.state.position
	const navigate = useNavigate();

	// States_공통
	const [loading, setLoading] = useState(false);
	const [start, setStart] = useState(100); // 화면 슬라이딩 효과를 위한 state
	const [end, setEnd] = useState(5); // 화면 슬라이딩 효과를 위한 state
	const [modalToggle, setModalToggle] = useState(false); // 장소 상세보기 모달
	const [mainLocation, setMainLocation] = useState({
		lat: 0.0,
		lng: 0.0,
	});
	const [mapLevel, setMapLevel] = useState(3);

	// States_추천/목록 리스트
	const [recommendListToggle, setRecommendListToggle] = useState(true); // [추천,목록] 메뉴 토글
	const [radius, setRadius] = useState(100); // 반경
	const [recommendList, setRecommendList] = useState([]); // [추천]리스트
	const [placeList, setPlaceList] = useState([]); // [목록]리스트
	const [page, setPage] = useState(0); // [추천] 페이지
	const [categoryNum, setCategoryNum] = useState(0); // [목록] 카테고리 번호
	const [reloadAudio] = useState(new Audio(`${process.env.PUBLIC_URL}/assets/sounds/reload.mp3`));

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

	// useEffect_첫 화면 렌더링 시
	useEffect(async () => {
		// 화면 제일 위에서 시작
		window.scrollTo(0, 0);

		setLoading(true);
		// 약속카드 리스트에 메인 장소 설정
		setPlanList([
			{
				name: location.state.content.placename,
				address: location.state.content.addressname,
				latitude: location.state.position.lat,
				longitude: location.state.position.lng,
				isMain: true,
			},
		]);

		setMainLocation({
			lat: location.state.position.lat,
			lng: location.state.position.lng,
		});

		const recommendListResponse = await getRecommendList({
			radius: radius,
			longitude: parseFloat(location.state.position.lng),
			latitude: parseFloat(location.state.position.lat),
		});
		const placeListResponse = await getPlaceList("한식", {
			radius: radius,
			longitude: parseFloat(location.state.position.lng),
			latitude: parseFloat(location.state.position.lat),
		});
		setRecommendList(recommendListResponse.data.Place);
		setPlaceList(placeListResponse.data.Place);
		setLoading(false);
	}, []);

	// useEffect_추천/목록 토글 시
	useEffect(() => {
		if (recommendListToggle) {
			// '추천' 선택 시
		} else {
			// '목록' 선택 시
		}
	}, [recommendListToggle]);

	// 반경 기준으로 장소 리스트 요청 함수
	const onHandleRadius = async () => {
		setLoading(true);
		if (radius <= 200) {
			setMapLevel(3);
		} else if (radius <= 250) {
			setMapLevel(4);
		} else if (radius <= 600) {
			setMapLevel(5);
		} else {
			setMapLevel(6);
		}
		const recommendListResponse = await getRecommendList({
			radius: radius,
			longitude: parseFloat(location.state.position.lng),
			latitude: parseFloat(location.state.position.lat),
		});
		const placeListResponse = await getPlaceList("한식", {
			radius: radius,
			longitude: parseFloat(location.state.position.lng),
			latitude: parseFloat(location.state.position.lat),
		});
		setRecommendList(recommendListResponse.data.Place);
		setPlaceList(placeListResponse.data.Place);
		setLoading(false);
	};

	// [추천리스트, 목록리스트] 버튼 누를 시 이벤트
	const onHandleChangeList = (toggle) => {
		setRecommendListToggle(toggle);
	};

	// 장소 상세보기 모달창 띄우기
	const openModal = (placeId) => {
		window.scrollTo(0, 0);
		if (modalToggle) {
			document.body.style = `overflow: auto`;
		} else {
			document.body.style = `overflow: hidden`;
		}

		setModalToggle(!modalToggle);
	};

	// 약속카드 - 약속이름 변경 이벤트
	const onHandleName = (e) => {
		setPlanInfo({ ...planInfo, name: e.target.value });
	};

	// 약속카드 - 약속날짜 변경 이벤트
	const onHandleDate = (value) => {
		setPlanInfo({ ...planInfo, date: moment(value).format("YYYY-MM-DD") });
	};

	// 약속카드 - 약속시간 변경 이벤트
	const onHandleTime = (e) => {
		setPlanInfo({ ...planInfo, time: e.target.value });
	};

	// 리로드 이벤트
	const onHandleReload = () => {
		reloadAudio.volume = 0.3;
		reloadAudio.play();
		setPage(page + 1);
	};

	// +, - 버튼 누를 시 이벤트
	const onHandleList = (listType, index) => {
		const arr1 = Array.from(recommendList);
		const arr2 = Array.from(planList);
		const arr3 = Array.from(trashList);

		if (listType === ListTypes.RECOMMEND) {
			// [추천] -> [약속]
			const arr1Index = (page * ELEMENTS_PER_PAGE + index) % recommendList.length;

			// 중복 방지 로직
			let tmpStr = JSON.stringify(arr1[arr1Index]);
			let dupResult = arr2.filter((item) => {
				return tmpStr.includes(JSON.stringify(item));
			});
			if (dupResult.length > 0) {
				// 중복이면
				alert("약속 카드에 중복된 장소를 담을 수 없습니다.");
				return;
			} else {
				// 중복이 아니면
				arr2.push(arr1[arr1Index]);
				arr1.splice(arr1Index, 1);
			}
		} else if (listType === ListTypes.PLAN) {
			// [약속] -> [휴지통]
			arr3.push(arr2[index]);
			arr2.splice(index, 1);
		} else if (listType === ListTypes.TRASH) {
			// [휴지통] -> [약속]
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
			{loading ? <Loading text="추천 장소들을 불러오고 있습니다..." /> : null}
			{modalToggle ? <CardDetail modalClose={openModal} title="제목" address="주소 주소" category="카테고리" target="타겟" score={4.3} /> : null}
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
						<TrashWrapper height={trashToggle ? "600px" : "0px"} mHeight={trashToggle ? "50%" : "0px"}>
							<PlanList pList={trashList} setPList={setTrashList} openModal={openModal} listType={ListTypes.TRASH} onHandleList={onHandleList} />
						</TrashWrapper>
					</PageHeaderBlock>
					<PlanBlock justifyContent="space-between">
						<PlanMakeWrapper width="calc(50% - 1rem)">
							{/* 반경 */}
							<RadiusWrapper>
								<Radius radius={radius} setRadius={setRadius} />
								<RadiusButton onClick={onHandleRadius}>설정</RadiusButton>
							</RadiusWrapper>
							{/* 카카오맵 */}
							<MapWrapper mapName="make" width="99%" height="100%">
								<MapContainer
									lat={mainLocation.lat}
									lng={mainLocation.lng}
									mapLevel={mapLevel}
									placeList={recommendList.slice(
										(page * ELEMENTS_PER_PAGE) % recommendList.length,
										((page * ELEMENTS_PER_PAGE) % recommendList.length) + ELEMENTS_PER_PAGE
									)}
									planList={planList}
								/>
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
								{recommendListToggle ? <RecommendHeader onHandleReload={onHandleReload} /> : <ListHeader />}
								<PlanList
									pList={recommendList.slice(
										(page * ELEMENTS_PER_PAGE) % recommendList.length,
										((page * ELEMENTS_PER_PAGE) % recommendList.length) + ELEMENTS_PER_PAGE
									)}
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
