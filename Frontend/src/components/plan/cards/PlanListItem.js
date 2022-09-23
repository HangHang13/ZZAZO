import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const PlaceCard = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	padding: 1rem;
	width: 80%;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	background-color: ${({ bg }) => bg};
	border-radius: 16px;
	box-shadow: 4px 4px 16px 4px rgba(0, 0, 0, 0.25);

	@media screen and (max-width: 1024px) and (min-width: 500px) {
		width: 60%;
	}
`;

const PlaceTitle = styled.p`
	display: flex;
	font-size: 1.1rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
`;

const PlaceCategory = styled.p`
	display: flex;
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
`;

const PlaceAddress = styled.p`
	display: flex;
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
`;

const PlaceInfoButton = styled.div`
	display: flex;
	position: absolute;
	right: 0.8rem;
	bottom: 0.8rem;
`;

const PlanListItem = ({ idx, placeId, placeName, placeAddress, placeScore, placeType, isMain, onHandleDrag, openModal }) => {
	return (
		<>
			<PlaceCard bg={isMain ? "#FF9BA9" : "#C0F0B0"} onMouseDown={onHandleDrag}>
				<PlaceTitle>{placeName === "지정위치" ? "사용자 지정 위치" : placeName}</PlaceTitle>
				{!isMain && <PlaceCategory>{placeType}</PlaceCategory>}
				<PlaceAddress>{placeAddress}</PlaceAddress>
				{!isMain && (
					<PlaceInfoButton onClick={() => openModal(placeId)}>
						<FontAwesomeIcon icon={faCircleInfo} size="lg" />
						{idx}
					</PlaceInfoButton>
				)}
			</PlaceCard>
		</>
	);
};

export default PlanListItem;
