import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { closeSlidingMenu } from "./SlidingMenu";

const Item = styled.div`
  padding: 20px;
  border-bottom: solid rgba(0, 0, 0, 0.25) 1px;
  white-space: nowrap;
  overflow: hidden;
`;

export default function SlidingMenuItem({ contents, to }) {
  const history = useHistory();

  const link = () => {
    history.push(to);
    closeSlidingMenu();
  };

  return <Item onClick={link}>{contents}</Item>;
}
