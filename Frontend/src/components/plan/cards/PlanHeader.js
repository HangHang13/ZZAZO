import React from "react";
import styled from "styled-components";

const PlanHeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 128px;
	background-color: #c0f0e0;
	border-bottom: 3px solid black;
`;

const PlanHeaderItem = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 90%;
	height: 32px;
	justify-content: center;
	margin-top: 0.25rem;
	margin-bottom: 0.25rem;
`;

const PlanHeaderName = styled.p`
	display: flex;
	width: 30%;
	height: 100%;
	line-height: 100%;
	text-align: center;
	align-items: center;
	justify-content: center;
	font-size: 1rem;
	font-weight: bold;
	margin-right: 5%;

	@media screen and (max-width: 1000px) {
		font-size: 0.9rem;
	}

	@media screen and (max-width: 500px) {
		font-size: 1rem;
	}
`;

const PlanHeaderInput = styled.input`
	display: flex;
	width: calc(65% - 1rem);
	height: 100%;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	line-height: 100%;
	border: none;
`;

const PlanHeader = () => {
	return (
		<PlanHeaderWrapper>
			<PlanHeaderItem>
				<PlanHeaderName>약속이름</PlanHeaderName>
				<PlanHeaderInput />
			</PlanHeaderItem>
			<PlanHeaderItem>
				<PlanHeaderName>약속날짜</PlanHeaderName>
				<PlanHeaderInput />
			</PlanHeaderItem>
			<PlanHeaderItem>
				<PlanHeaderName>약속시간</PlanHeaderName>
				<PlanHeaderInput />
			</PlanHeaderItem>
		</PlanHeaderWrapper>
	);
};

export default PlanHeader;
