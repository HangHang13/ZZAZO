import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/fontawesome-free-solid";

const LayOutWrapper = styled.div`
	display: flex;
	position: relative;
	justify-content: space-between;
	align-items: center;
	width: 80%;

	@media screen and (max-width: 1280px) {
		width: 100vw;
	}
`;

const Container = styled.div`
	width: 60rem;
	margin: auto;
	overflow: hidden;
	@media screen and (max-width: 1024px) {
		width: 100%;
	}
`;
const ButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 40rem;
	text-align: center;
	z-index: 100;

	&:hover {
		transform: scale(1.1);
	}
	@media screen and (max-width: 1440px) {
		position: absolute;
		left: ${({ loc }) => (loc === "left" ? "1rem" : "")};
		right: ${({ loc }) => (loc === "right" ? "1rem" : "")};
	}
`;

const SliderContainer = styled.div`
	display: flex;
	width: ${({ length }) => `${length * 60}rem`};
	height: 20rem;
	margin: 0 auto;
	margin-bottom: 2rem;

	@media screen and (max-width: 1024px) {
		width: ${({ length }) => `${length * 100}%`};
	}
`;

const Slider = ({ placeList }) => {
	// Constants
	const TOTAL_SLIDES = placeList.length - 1; // 전체 슬라이드 개수

	// States, Refs
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideRef = useRef(null);

	// Next 버튼 클릭 시
	const NextSlide = () => {
		if (currentSlide >= TOTAL_SLIDES) {
			return; // 클릭이 작동하지 않습니다.
		} else {
			setCurrentSlide(currentSlide + 1);
		}
	};
	// Prev 버튼 클릭 시
	const PrevSlide = () => {
		if (currentSlide === 0) {
			return; // 클릭이 작동하지 않습니다.
		} else {
			setCurrentSlide(currentSlide - 1);
		}
	};

	useEffect(() => {
		slideRef.current.style.transition = "all 0.5s ease-in-out";
		let s = (currentSlide * 100) / placeList.length;
		slideRef.current.style.transform = `translateX(-${s}%)`;
	}, [currentSlide]);

	return (
		<LayOutWrapper>
			<ButtonWrapper loc="left">
				<FontAwesomeIcon onClick={PrevSlide} icon={faCaretLeft} size="8x" opacity={0.3}></FontAwesomeIcon>
			</ButtonWrapper>
			<Container>
				<SliderContainer ref={slideRef} length={placeList.length}>
					{placeList.map((item, index) => (
						<Slide key={index} cardData={item} />
					))}
				</SliderContainer>
			</Container>
			<ButtonWrapper loc="right">
				<FontAwesomeIcon onClick={NextSlide} icon={faCaretRight} size="8x" opacity={0.3}></FontAwesomeIcon>
			</ButtonWrapper>
		</LayOutWrapper>
	);
};

export default Slider;
