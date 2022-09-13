import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const TabCard = styled.div`
  margin: auto;
  cursor: pointer;
  padding: 16 0;
`;

const StyledNavLink = styled(NavLink)`
  color: #80c0a0;
  text-decoration: none;
  padding: 16px;
  border-left: 2px solid transparent;
  font-family: "Courier New";
  &.active {
    border-left: 2px solid #80e080;
  }
`;
const TabItem = ({ tabId, title, link }) => {
  return (
    <TabCard>
      <StyledNavLink to={link}>{title}</StyledNavLink>
    </TabCard>
  );
};

export default TabItem;
