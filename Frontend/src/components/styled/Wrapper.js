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
  background-color: ${({ color }) => color};
  width: 100vw;
  min-height: 100vh;
  align-items: ${({ alignItems }) => alignItems};

  @media screen and (max-width: 500px) {
    width: 100vw;
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

export const InputWrapper = styled.div`
  justify-content: space-between;
  width: 380px;
  height: 64px;
  border-radius: 36px;
  border: 1px solid black;
  background-color: #676775;
  margin: 14px;
  position: relative;
  @media screen and (max-width: 500px) {
    width: 250px;
    height: 42px;
  }
`;

RoundedWrapper.defaultProps = {
  flexDirection: "row",
};

Wrapper.defaultProps = {
  color: "black",
  alignItems: "center",
};
