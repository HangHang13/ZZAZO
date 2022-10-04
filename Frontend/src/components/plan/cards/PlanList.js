import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { faCircleInfo, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ListTypes } from "./../../../constants/ListTypes";

const PlanListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
	padding-bottom: 6rem;

	::-webkit-scrollbar {
		width: 8px;
		border-radius: 8px;
	}

	::-webkit-scrollbar-track {
		background: #eeeeee;
		border-radius: 8px;
	}

	::-webkit-scrollbar-thumb {
		background: linear-gradient(#c2e59c, #64b3f4);
	}
`;

const NotFoundMessage = styled.p`
	margin-top: 1rem;
	text-align: center;
	font-weight: bold;
`;

/* Place 카드 하나에 대한 스타일 시작 */
const PlaceCard = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	justify-content: center;
	text-align: left;
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
	margin-right: 10%;
`;

const PlaceCategory = styled.p`
	display: flex;
	font-size: 0.8rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
	margin-right: 10%;
`;

const PlaceAddress = styled.p`
	display: flex;
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
	margin-right: 10%;
`;

const PlaceInfoButton = styled.div`
	display: flex;
	position: absolute;
	right: 1rem;
	bottom: 0.8rem;
	padding: 0.3rem;
`;

const AddOrRemoveButton = styled.div`
	display: flex;
	position: absolute;
	right: 1rem;
	top: 0.8rem;
	padding: 0.3rem;
	border-radius: 100%;

	&: hover {
		background-color: rgba(38, 38, 38, 0.3);
		transition: 0.5s ease;
	}
`;

const CardTitle = styled.div`
	display: flex;
	font-size: 1.1rem;
	font-weight: bold;
`;

const CardNumber = styled.div`
	display: flex;
	font-size: 0.9rem;
	padding: 0.1rem;
	font-weight: bold;
	border: 1px solid black;
	border-radius: 100%;
	width: 16px;
	height: 16px;
	margin-right: 0.5rem;
	text-align: center;
	align-items: center;
	justify-content: center;
`;
/* Place 카드 하나에 대한 스타일 끝 */

const PlanList = ({ pList, setPList, openModal, onHandleList, listType }) => {
	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(pList);

		const tmp = pList[result.source.index]; // 원래 거 저장
		items.splice(result.source.index, 1); // 원래 부분 제거
		items.splice(result.destination.index, 0, tmp); // 목적지에 원래 부분 추가
		setPList(items);
	};

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="list">
				{(provided) => (
					<PlanListWrapper className="list" {...provided.droppableProps} ref={provided.innerRef}>
						{pList.length !== 0 ? (
							<>
								{pList.map((item, index) => (
									<Draggable key={item._id} draggableId={String(item._id)} index={index}>
										{(provided) => (
											<PlaceCard
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												bg={item.isMain ? "#FF9BA9" : "#C0F0B0"}
											>
												<PlaceTitle>
													{item.name ? (
														<>
															<CardNumber>{index + 1}</CardNumber>
															<CardTitle>{item.name}</CardTitle>
														</>
													) : (
														"사용자 지정 위치"
													)}
												</PlaceTitle>
												{!item.isMain && <PlaceCategory>{item.place_type}</PlaceCategory>}
												<PlaceAddress>{item.address}</PlaceAddress>
												{!item.isMain && (
													<PlaceInfoButton onClick={() => openModal(item._id)}>
														<FontAwesomeIcon icon={faCircleInfo} size="lg" />
													</PlaceInfoButton>
												)}
												{listType === ListTypes.PLAN ? (
													!item.isMain ? (
														<AddOrRemoveButton onClick={() => onHandleList(listType, index)}>
															<FontAwesomeIcon icon={faMinus} size="lg" />
														</AddOrRemoveButton>
													) : (
														<></>
													)
												) : (
													<AddOrRemoveButton onClick={() => onHandleList(listType, index)}>
														<FontAwesomeIcon icon={faPlus} size="lg" />
													</AddOrRemoveButton>
												)}
											</PlaceCard>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</>
						) : (
							<>
								{listType === ListTypes.RECOMMEND || listType === ListTypes.PLACE ? (
									<NotFoundMessage>주변에 추천 가능한 장소가 없습니다.</NotFoundMessage>
								) : null}
							</>
						)}
					</PlanListWrapper>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default PlanList;
