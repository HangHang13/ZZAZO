import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";
import img1 from "./location2.jpg";
import img2 from "./location3.jpg";
import img3 from "./location4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";

const TOTAL_SLIDES = 2; // 전체 슬라이드 개수(총3개. 배열로 계산)

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  // Next 버튼 클릭 시
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면
      setCurrentSlide(0); // 1번째 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // Prev 버튼 클릭 시
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES); // 마지막 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [currentSlide]);

  return (
    <LayOutWrapper>
      <ButtonWrapper>
        <FontAwesomeIcon onClick={PrevSlide} icon={faCaretLeft} size="8x"></FontAwesomeIcon>
      </ButtonWrapper>
      <Container>
        <SliderContainer ref={slideRef}>
          <Slide img={img1} />
          <Slide img={img2} />
          <Slide img={img3} />
        </SliderContainer>
      </Container>
      <ButtonWrapper>
        <FontAwesomeIcon onClick={NextSlide} icon={faCaretRight} size="8x"></FontAwesomeIcon>
      </ButtonWrapper>
    </LayOutWrapper>
  );
}

const LayOutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const Container = styled.div`
  width: 40rem;
  margin: auto;
  overflow: hidden; // 선을 넘어간 이미지들은 숨겨줍니다.
`;
const ButtonWrapper = styled.div`
  display: flex;

  align-items: center;
  height: 40rem;
  text-align: center;
  padding: 2rem 6rem;
  &:hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 720px) {
    padding: 1rem 2rem;
    transform: scale(0.8);
  }
  @media screen and (max-width: 620px) {
    padding: 0;
    transform: scale(0.5);
  }
`;

const SliderContainer = styled.div`
  width: 40rem;
  height: 40rem;
  background-color: green;
  margin: 0 auto;
  margin-bottom: 2em;
  display: flex; // 이미지들을 가로로 나열합니다.
`;
