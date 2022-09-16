import React from "react";
import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import CreatePlan from "./CreatePlan";
import SelectPosition from "./SelectPosition";

const Plan = () => {
  return (
    <>
      <Header></Header>
      <Wrapper>
        <SelectPosition />
        <CreatePlan />
      </Wrapper>
    </>
  );
};

export default Plan;
