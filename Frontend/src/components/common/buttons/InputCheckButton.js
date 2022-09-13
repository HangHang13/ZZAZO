import styled from "styled-components";

const ButtonWrapper = styled.button`
	display: flex;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	color: ${({ color }) => color};
	background-color: ${({ bg }) => bg};
	border-radius: 8px;
	border: 1px solid #767676;
	text-align: center;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	font-weight: bold;

	&:hover {
		background-color: #c0f0b0;
		border: 1px solid #80e080;
	}
`;

ButtonWrapper.defaultProps = {
	width: "100px",
	height: "52px",
	color: "#000000",
	bg: "#ffffff",
};

const InputCheckButton = ({ message, width, height, color, bg }) => {
	return (
		<ButtonWrapper width={width} height={height} color={color} bg={bg}>
			{message}
		</ButtonWrapper>
	);
};

export default InputCheckButton;
