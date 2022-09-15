import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  color: ${({ color }) => color};
  background-color: ${({ bg }) => bg};
  border-radius: ${({ borderRadius }) => borderRadius};
  border: 1px solid ${({ borderColor }) => borderColor};
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;

  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  transition: all 0.2s ease-in;
  // &:active {
  //   background: rgba(0, 0, 0, 0.5);
  //   border: 1px solid #383838;
  // }
`;

Btn.defaultProps = {
  width: "100px",
  height: "52px",
  color: "#000000",
  bg: "#ffffff",
  borderColor: "#767676",
  borderRadius: "8px",
};

const Button = ({
  message,
  width,
  height,
  color,
  bg,
  borderColor,
  borderRadius,
  clickEvent,
}) => {
  return (
    <Btn
      width={width}
      height={height}
      color={color}
      bg={bg}
      borderColor={borderColor}
      borderRadius={borderRadius}
      onClick={clickEvent}
    >
      {message}
    </Btn>
  );
};

export default Button;
