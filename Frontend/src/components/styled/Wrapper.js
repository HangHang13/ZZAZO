import styled from "styled-components";

export const BaseFlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BaseFlexColWrapper = styled(BaseFlexWrapper)`
  flex-direction: column;
`;

export const Wrapper = styled(BaseFlexWrapper)`
  display: flex;
  background-color: ${({ color }) => color};
  align-items: ${({ alignItems }) => alignItems};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding-top: ${({ paddingTop }) => paddingTop};

  @media screen and (max-width: 500px) {
    width: 100vw;
  }
`;

export const PlanPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ bg }) => bg};
  align-items: ${({ alignItems }) => alignItems};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding-top: ${({ paddingTop }) => paddingTop};

  @media screen and (max-width: 500px) {
    width: 100vw;
  }
`;

export const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MobileSizeWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  width: 400px;
  justify-content: center;

  @media screen and (max-width: 500px) {
    width: 90vw;
  }
`;

export const RoundedWrapper = styled(BaseFlexWrapper)`
  border-radius: 40px;
  flex-direction: ${(props) => props.flexDirection};
  background-color: #131317;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;

  @media screen and (max-width: 500px) {
    width: ${(props) => props.mWidth}px;
    height: ${(props) => props.mHeight}px;
  }
`;

export const InputWrapper = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ bg }) => bg};
  border-radius: 8px;
  border: 1px solid #d0d0d0;
  padding-left: 0.5rem;
  position: relative;

  @media screen and (max-width: 500px) {
    width: 67%;
  }
`;

export const InputFullWrapper = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ bg }) => bg};
  border-radius: 8px;
  border: 1px solid #d0d0d0;
  padding-left: 0.5rem;
  position: relative;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.button`
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

InputWrapper.defaultProps = {
  width: "100%",
  height: "52px",
  bg: "white",
};

InputFullWrapper.defaultProps = {
  width: "100%",
  height: "52px",
  bg: "white",
};

ButtonWrapper.defaultProps = {
  width: "100px",
  height: "52px",
  color: "#000000",
  bg: "#ffffff",
};

RoundedWrapper.defaultProps = {
  flexDirection: "row",
};

PlanPageWrapper.defaultProps = {
  bg: "white",
  alignItems: "center",
  width: "100vw",
  height: "calc(100vh - 6rem)",
  paddingTop: "6rem",
};

Wrapper.defaultProps = {
  color: "white",
  alignItems: "center",
  width: "100vw",
  height: "calc(100vh - 6rem)",
  paddingTop: "6rem",
};
