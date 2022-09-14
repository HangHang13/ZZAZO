import React from "react";
import styled from "styled-components";

const Btn = styled.button`
	display: flex;
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	color: ${({ color }) => color};
	background-color: ${({ bg }) => bg};
	border-radius: 8px;
	border: 1px solid ${({ borderColor }) => borderColor};
	text-align: center;
	justify-content: center;
	align-items: center;
	font-size: 1rem;
	font-weight: bold;
`;

Btn.defaultProps = {
	width: "100px",
	height: "52px",
	color: "#000000",
	bg: "#ffffff",
	borderColor: "#767676",
};

const Button = ({ message, width, height, color, bg, borderColor, clickEvent }) => {
	return (
		<Btn width={width} height={height} color={color} bg={bg} borderColor={borderColor} onClick={clickEvent}>
			{message}
		</Btn>
	);
};

export default Button;
