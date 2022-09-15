import React from "react";
import styled from "styled-components";

const DivBtn = styled.div`
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
`;

DivBtn.defaultProps = {
  width: "100px",
  height: "52px",
  color: "#000000",
  bg: "#ffffff",
  borderColor: "#767676",
};

const DivButton = ({
  message,
  width,
  height,
  color,
  bg,
  borderColor,
  clickEvent,
}) => {
  return (
    <DivBtn
      width={width}
      height={height}
      color={color}
      bg={bg}
      borderColor={borderColor}
      onClick={clickEvent}
    >
      {message}
    </DivBtn>
  );
};

export default DivButton;
