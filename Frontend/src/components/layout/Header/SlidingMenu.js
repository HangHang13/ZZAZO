import React from "react";
import styled from "styled-components";
import SlidingMenuItem from "./SlidingMenuItem";

const Container = styled.div`
  display: none;
  z-index: 9999;
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 500px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`;

const Menu = styled.div`
  float: right;
  display: none;
  flex-direction: column;
  width: 55%;
  height: 100%;
  background: white;
`;

const ExitButton = styled.i`
  padding: 20px;
  margin-right: auto;
`;

// export const openSlidingMenu = () => {
//   show
// }
