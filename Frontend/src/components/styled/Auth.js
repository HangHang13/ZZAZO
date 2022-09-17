import styled from "styled-components";
import { InputWrapper } from "./Wrapper";

export const LogoImage = styled.img`
	display: flex;
	width: 100px;
	height: 80px;
	margin-bottom: 1rem;
	@media screen and (max-width: 500px) {
		height: 30%;
	}
`;

export const AuthWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 480px;
	padding-top: 2rem;
	padding-bottom: 2rem;
	margin-bottom: 1rem;
	border: ${({ border }) => border};
	border-radius: ${({ borderRadius }) => borderRadius};
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 500px) {
		width: 90vw;
	}
`;

AuthWrapper.defaultProps = {
	border: "1px solid #80c0a0",
	borderRadius: "8px",
};

export const AuthInput = styled(InputWrapper)`
	margin-top: 0.75rem;
	margin-bottom: 0.75rem;
`;

export const Options = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-bottom: 2rem;
`;

export const Option = styled.div`
	font-size: 1rem;
	-ms-user-select: none;
	-moz-user-select: none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	user-select: none;
`;

export const OptionBorder = styled.div`
	border-left: 0.5px solid #d0d0d0;
	border-right: 0.5px solid #d0d0d0;
	margin-left: 0.9rem;
	margin-right: 0.9rem;
`;

export const FindTitle = styled.h1`
	text-align: center;
	color: black;
	font-weight: bold;
	margin-top: 3rem;
`;

export const FindGuide = styled.p`
	display: flex;
	font-size: 0.9rem;
	margin-top: 1rem;
	margin-bottom: 1rem;
	width: 100%;
	justify-content: center;

	@media screen and (max-width: 500px) {
		width: 80%;
	}
`;

// * 생년월일 셀렉트박스 시작 *
export const InputBlock = styled.div`
	display: flex;
	flex-direction: row;
	width: 80%;
	justify-content: space-between;
	margin-top: 0.5rem;
	margin-bottom: 2rem;
`;

export const BirthSelectBox = styled.select`
	width: 30%;
	height: 52px;
	background-color: white;
	border-radius: 8px;
	border: 1px solid #d0d0d0;
	text-align: center;
	font-size: 0.9rem;
`;
// * 생년월일 셀렉트박스 끝 *
