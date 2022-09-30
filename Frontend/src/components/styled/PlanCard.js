import styled from "styled-components";

export const PlanBlock = styled.div`
	display: flex;
	flex-direciton: column;
	background-color: ${({ bg }) => bg};
	align-items: center;
	justify-content: ${({ justifyContent }) => justifyContent};
	width: 100%;
	height: ${({ height }) => height};
	@media screen and (max-width: 500px) {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		margin: 1rem;
	}
`;

PlanBlock.defaultProps = {
	bg: "white",
	height: "8rem",
};

export const PlanMakeWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: ${({ width }) => width};
	height: 100%;
	min-height: 500px;
	user-select: none;
	overflow-x: hidden;
	overflow-y: hidden;

	@media screen and (max-width: 500px) {
		width: 100%;
		margin-top: 1rem;
		margin-bottom: -10rem;
	}
`;

export const MapWrapper = styled.div`
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
		justify-content: center;
		width: 100%;
		height: 300px;
		margin-bottom: -25vh;
	}
`;

MapWrapper.defaultProps = {
	width: "70%",
	height: "100%",
	boxShadow: "2px 0 4px 0 #303030",
};

export const SectionTitle = styled.div`
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
export const PlanListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 40%;
	overflow-x: hidden;
	overflow-y: scroll;
	padding-bottom: 6rem;
`;
export const PlanCard = styled.div`
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
export const PlaceCard = styled.div`
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

export const PlaceTitle = styled.p`
	display: flex;
	font-size: 1.1rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
	margin-right: 10%;
`;
export const PlaceCategory = styled.p`
	display: flex;
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
	margin-right: 10%;
`;
export const PlaceAddress = styled.p`
	display: flex;
	font-size: 0.8rem;
	margin-bottom: 0.5rem;
	margin-right: 10%;
`;
export const PlanHeaderWrapper = styled.div`
	display: flex;
	flex-direction: ${({ flexDirection }) => flexDirection};
	// align-items: center;
	text-align: center;
	width: 100%;
	height: ${({ height }) => height};
	background-color: #c0f0e0;
	border-bottom: 3px solid black;
	word-wrap: break-word;
`;
export const PlanHeaderItem = styled.div`
	display: flex;
	position: relative;
	flex-direction: row;
	align-items: center;
	width: 90%;
	height: 32px;
	justify-content: center;
	margin-top: 0.25rem;
	margin-bottom: 0.25rem;
`;
export const PlanHeaderName = styled.p`
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
PlanHeaderWrapper.defaultProps = {
	height: "120px",
	flexDirection: "column",
};
export const PlanHeaderInput = styled.div`
	display: flex;
	width: calc(65% - 1rem);
	height: 100%;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	line-height: 100%;
	border: none;
	background-color: white;
	// justify-content: center;
	align-items: center;
`;
