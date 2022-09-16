import React from "react";
import styled from "styled-components";

const AuthBtn = styled.button`
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

  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  transition: all 0.2s ease-in;
  &:hover {
    background: #c0f0b0;
    border: 1px solid #80e080;
  }
`;

AuthBtn.defaultProps = {
  width: "80%",
  height: "52px",
  color: "#80C0A0",
  bg: "#ffffff",
  borderColor: "#80E080",
};

const AuthButton = ({
  message,
  width,
  height,
  color,
  bg,
  borderColor,
  clickEvent,
}) => {
  return (
    <AuthBtn
      width={width}
      height={height}
      color={color}
      bg={bg}
      borderColor={borderColor}
      onClick={clickEvent}
    >
      {message}
    </AuthBtn>
  );
};

export default AuthButton;
