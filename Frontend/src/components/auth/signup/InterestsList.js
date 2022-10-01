import React from "react";
import InterestsListItem from "./InterestsListItem";
import styled from "styled-components";

const InterestsBody = styled.div`
	display: grid;
	width: 100%;
	padding-top: 1rem;
	justify-content: space-between;
	align-items: space-between;
	place-items: center;
	grid-template-rows: 1fr;
	grid-template-columns: 1fr 1fr 1fr;
`;

const InterestsList = React.memo(({ intList, onHandleInterestClick }) => {
	return (
		<>
			{intList.length !== 0 ? (
				<InterestsBody>
					{intList.map((item, index) => (
						<InterestsListItem categoryName={item} key={index} onHandleInterestClick={onHandleInterestClick} fontSize="1rem" />
					))}
				</InterestsBody>
			) : (
				<>
					<p align="center">관심 카테고리 내역이 없습니다.</p>
				</>
			)}
		</>
	);
});

export default InterestsList;
