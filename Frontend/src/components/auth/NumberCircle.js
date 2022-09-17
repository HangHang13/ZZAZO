import React from "react";
import styled from "styled-components";

const Circle = styled.div`
	display: flex;
	border-radius: 50%;
	background-color: ${({ color }) => color};
	color: white;
	width: 5rem;
	height: 5rem;
	margin-left: 2rem;
	margin-right: 2rem;
	align-items: center;
	justify-content: center;
	font-size: 2.2rem;

	@media screen and (max-width: 500px) {
		width: 4.5rem;
		height: 4.5rem;
		margin-left: 1.5rem;
		margin-right: 1.5rem;
		font-size: 2rem;
	}
`;

const NumberCircle = ({ color, number }) => {
	return <Circle color={color}>{number}</Circle>;
};

export default NumberCircle;
