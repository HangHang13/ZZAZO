import React from "react";
import styled from "styled-components";
import PlanListItem from "./PlanListItem";

const PlanListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	overflow-y: scroll;
`;

const PlanList = ({ openModal }) => {
	return (
		<PlanListWrapper>
			<PlanListItem placeId={1} title="강남역" address="서울특별시 서초구 서초대로1" isMain={true} openModal={openModal} />
			<PlanListItem placeId={75} title="땀땀" address="서울특별시 서초구 서초대로37" category="음식점" isMain={false} openModal={openModal} />
			{/* <PlanListItem placeId={75} title="땀땀" address="서울특별시 서초구 서초대로37" category="음식점" isMain={false} openModal={openModal} />
			<PlanListItem placeId={75} title="땀땀" address="서울특별시 서초구 서초대로37" category="음식점" isMain={false} openModal={openModal} />
			<PlanListItem placeId={75} title="땀땀" address="서울특별시 서초구 서초대로37" category="음식점" isMain={false} openModal={openModal} />
			<PlanListItem placeId={75} title="땀땀" address="서울특별시 서초구 서초대로37" category="음식점" isMain={false} openModal={openModal} /> */}
		</PlanListWrapper>
	);
};

export default PlanList;
