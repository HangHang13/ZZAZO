import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { ButtonWrapper, Wrapper } from "../../components/styled/Wrapper";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const WarningPhrases = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;
`;
const FirstPhrase = styled.h1`
  font-size: 5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.4rem;
`;
const SecondPhrase = styled.h1`
  font-size: 6rem;
  font-weight: bolder;
  color: white;
  margin-bottom: 0.4rem;
`;
const ThirdPhrase = styled.h2`
  font-size: 4rem;
  font-weight: bold;
  color: green;
  margin-bottom: 0.4rem;
`;
const Description = styled.div`
  color: white;
  font-size: 3rem;
  margin-bottom: 0.4rem;
`;
const ExeImage = styled.img.attrs({
  src: `assets/notfound/notfound.png`,
})`
  width: 30%;
`;
const NotFoundButton = styled(ButtonWrapper)`
  animation: motion 0.5s linear infinite alternate;
  margin-top: 0px;
  margin: 0.5rem;
  width: 240px;
  background-color: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 4px 4px 8px #80c0a0;
  color: white;
  @keyframes motion {
    0% {
      margin-top: 0px;
    }
    100% {
      margin-top: 0.2rem;
    }
  }
  @media screen and (max-width: 1000px) {
    width: 100vw;
  }
  @media screen and (max-width: 800px) {
    width: 70vw;
  }
  @media screen and (max-width: 500px) {
    width: 40vw;
    @keyframes motion {
      0% {
        margin-top: 0px;
      }
      100% {
        margin-top: 0px;
      }
    }
  }
`;
const ButtonBlock = styled.div`
  display: flex;
  flex-direciton: column;
  background-color: ${({ bg }) => bg};
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  width: 100%;
  height: ${({ height }) => height};
  margin-top: 1rem;
  padding: 0.5rem;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
ButtonBlock.defaultProps = {
  bg: "#80e080",
};

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Wrapper alignItems="center" color="#80e080">
        <ExeImage />
        <WarningPhrases>
          <FirstPhrase>이런! 죄송합니다.</FirstPhrase>
          <Description>요청하신 페이지를 찾을 수 없습니다.</Description>
          <SecondPhrase>404</SecondPhrase>
          <ThirdPhrase>NOT FOUND</ThirdPhrase>
          <ButtonBlock height="200px" justifyContent="space-around">
            <NotFoundButton onClick={() => navigate("/")}>
              메인으로
            </NotFoundButton>
            <NotFoundButton onClick={() => navigate(-1)}>
              뒤로가기
            </NotFoundButton>
          </ButtonBlock>
        </WarningPhrases>
      </Wrapper>
    </>
  );
};

export default NotFound;
