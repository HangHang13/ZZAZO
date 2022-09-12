import React from "react";
import styled from "styled-components";
import { Wrapper, MobileSizeWrapper, InputWrapper, ButtonWrapper } from "./../../components/styled/Wrapper";

const SignupHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 200px;
	background-color: beige;
`;

const SignupBody = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	//background-color: aqua;
`;

const ProgressBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const NumberCircle = styled.div`
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
`;

const ProgressDescription = styled.div`
	margin-top: 0.5rem;
	text-align: center;
`;

const InputBlock = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
`;

const Signup = () => {
	return (
		<Wrapper>
			<MobileSizeWrapper>
				<SignupHeader>
					<ProgressBlock>
						<NumberCircle color="#C0F0B0">1</NumberCircle>
						<ProgressDescription>회원정보 입력</ProgressDescription>
					</ProgressBlock>
					<ProgressBlock>
						<NumberCircle color="#D0D0D0">2</NumberCircle>
						<ProgressDescription>관심정보 입력</ProgressDescription>
					</ProgressBlock>
				</SignupHeader>
				<SignupBody>
					<InputBlock>
						<InputWrapper placeholder="user@example.com" />
						<ButtonWrapper>중복 확인</ButtonWrapper>
					</InputBlock>
				</SignupBody>
			</MobileSizeWrapper>
		</Wrapper>
	);
};

export default Signup;
