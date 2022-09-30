import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid";

const InterestsItem = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	height: ${({ height }) => height};
	margin-bottom: 1rem;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	border: 1px solid ${({ borderColor }) => borderColor};
	background-color: ${({ bg }) => bg};
	overflow: hidden;
	white-space: normal;
	word-break: keep-all;
	user-select: none;
	transition: 0.15s ease;
	color: #383838;
`;

InterestsItem.defaultProps = {
	height: "60px",
};

const InterestTag = styled.p`
	font-size: ${({ fontSize }) => fontSize};
	font-weight: bold;
`;

InterestTag.defaultProps = {
	fontSize: "1.2rem",
};

const InterestsListItem = ({ categoryName, onHandleInterestClick, height, fontSize }) => {
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
			height={height}
		>
			{/* <FontAwesomeIcon icon="coffee" /> */}
			<InterestTag fontSize={fontSize}>{categoryName}</InterestTag>
		</InterestsItem>
	);
};

export default InterestsListItem;
