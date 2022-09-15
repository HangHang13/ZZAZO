import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import fontawesome from "@fortawesome/fontawesome";
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid";

const InterestsItem = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	height: 100px;
	margin-bottom: 1rem;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	border: 1px solid ${({ borderColor }) => borderColor};
	background-color: ${({ bg }) => bg};
	color: #383838;
`;

const InterestTag = styled.p`
	margin-top: 0.5rem;
	font-size: 1.2rem;
`;

const InterestsListItem = ({ mainCategoryId, subCategoryId, categoryName, icon, onHandleInterestClick }) => {
	const [state, setState] = useState({
		isClicked: false,
	});

	const clickEvent = (cName) => {
		setState({ ...state, isClicked: !state.isClicked });
		onHandleInterestClick(cName);
	};

	fontawesome.library.add(faCheckSquare, faCoffee);

	return (
		<InterestsItem
			onClick={() => clickEvent(categoryName)}
			borderColor={state.isClicked ? "#80E080" : "#d0d0d0"}
			bg={state.isClicked ? "#C0F0B0" : "#FFFFFF"}
		>
			<FontAwesomeIcon icon="coffee" />
			<InterestTag>{categoryName}</InterestTag>
		</InterestsItem>
	);
};

export default InterestsListItem;
