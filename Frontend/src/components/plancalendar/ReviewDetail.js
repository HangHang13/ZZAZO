import { React, useRef, useState } from "react";
import styled from "styled-components";
import { BaseForm } from "../common/forms/Form";
import ReviewCard from "../locationdetail/ReviewCard";
import Rating from "./Rating";
import { postReview } from "../../api/ReviewAPI";

const CreateReview = async () => {
	await postReview();
};

//title : 장소명
//address : 주소
//category : 장소 카테고리
//target : 주요 이용 고객
//score : 별점
const ReviewDetail = ({ modalClose, title, address, category, target, score }) => {
	const [review, setreview] = useState(false);
	let searchTitle = title.replace(/ /g, "");
	return (
		<Background>
			<CardWrapper>
				<ExitBtnWrapper>
					<ImgButton src={`${process.env.PUBLIC_URL}/assets/card/exit.png`} alt="exit" onClick={modalClose}></ImgButton>
				</ExitBtnWrapper>
				<TitleWrapper>
					<CardTitle>{title}</CardTitle>
					<a href={`https://www.instagram.com/explore/tags/${searchTitle}/?hl=ko`} target="_blank">
						<ImgButton src={`${process.env.PUBLIC_URL}/assets/card/insta.png`} alt="insta"></ImgButton>
					</a>
				</TitleWrapper>

				<CardLine width="80%"></CardLine>
				<CardMainWrapper>
					<CardInfoWrapper>
						<CardInfo>
							<CardInfoItem>
								<InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/location.png`} alt="location"></InfoIcon>
								{address}
							</CardInfoItem>
							<CardInfoItem>
								<InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/sushi.png`} alt="location"></InfoIcon>
								{category}
							</CardInfoItem>
							<CardInfoItem>
								<InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/women.png`} alt="location"></InfoIcon>
								{target}
							</CardInfoItem>
							<CardInfoItem>
								<InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/star.png`} alt="location"></InfoIcon>
								{score}
							</CardInfoItem>
						</CardInfo>
					</CardInfoWrapper>
					<CardImgWrapper>
						<CardImg src={`${process.env.PUBLIC_URL}/assets/card/gazi.png`} alt="gazi"></CardImg>
					</CardImgWrapper>
				</CardMainWrapper>
				<EmptyBorder></EmptyBorder>
				<CardLine width="80%"></CardLine>

				<StarWrapper>
					<Rating></Rating>
				</StarWrapper>

				<ReviewTextArea
					onMouseOut={(e) => {
						console.log(e.currentTarget.value);
						setreview(e.currentTarget.value);
					}}
				></ReviewTextArea>

				<ReviewWrapper>
					<SubmitBtn onClick={() => CreateReview(review)} value="리뷰 등록"></SubmitBtn>
				</ReviewWrapper>
			</CardWrapper>
		</Background>
	);
};

const Background = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background: #000000b7;
	z-index: 1000;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	width: 55rem;
	height: 41rem;
	padding-top: 1.5rem;
	padding-left: 1.5rem;
	border-radius: 16px;
	box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
	margin-bottom: 3rem;

	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;
	@media screen and (max-height: 600px) {
		top: 80%;
	}
	@media screen and (max-width: 970px) {
		width: 45rem;
		height: 43rem;
		flex-direction: column;
	}
	@media screen and (max-width: 780px) {
		width: 36rem;
		height: 43rem;
		flex-direction: column;
	}
	@media screen and (max-width: 645px) {
		width: 30rem;
		height: 43rem;
		flex-direction: column;
	}
	@media screen and (max-width: 500px) {
		top: 80%;
		width: 27rem;
		height: 48rem;
		flex-direction: column;
		margin-bottom: 0;
	}
`;
const ExitBtnWrapper = styled.div`
	width: 52rem;
	display: flex;

	justify-content: flex-end;
	@media screen and (max-width: 970px) {
		width: 42rem;
		margin-bottom: 1rem;
	}
	@media screen and (max-width: 780px) {
		width: 33rem;
	}
	@media screen and (max-width: 645px) {
		width: 27rem;
	}
	@media screen and (max-width: 500px) {
		width: 27rem;
		margin-bottom: 1rem;
	}
`;

const CardTitle = styled.div`
	font-size: 2.3rem;
	font-weight: bold;
	padding-bottom: ;
	@media screen and (max-width: 970px) {
		font-size: 2rem;
	}
`;
const CardLine = styled.hr`
	margin-top: 0.5rem;
	margin-bottom: 1rem;
	width: ${({ hrwidth }) => hrwidth};
	height: 0.3rem;
	background-color: black;
	color: black;
	@media screen and (max-width: 970px) {
		width: 90%;
	}
`;
const CardMainWrapper = styled.div`
	width: 50rem;
	height: 18rem;
	display: flex;
	justify-content: space-evenly;
	@media screen and (max-width: 970px) {
		width: 40rem;
		height: 15rem;
		margin-bottom: 1rem;
	}
	@media screen and (max-width: 780px) {
		width: 36rem;
	}
	@media screen and (max-width: 645px) {
		width: 28rem;
	}
	@media screen and (max-width: 500px) {
		padding-left: 2rem;
		margin-top: 7rem;
		width: 25rem;
		height: 10rem;
		flex-direction: column;
	}
`;

const CardInfoWrapper = styled.div`
	text-align: left;
	font-size: 1.3rem;
	padding-top: 0.5rem;
	display: flex;
	@media screen and (max-width: 780px) {
		font-size: 1.2rem;
		margin-bottom: 1.5rem;
	}

	@media screen and (max-width: 500px) {
		padding-top: 0;
		width: 24rem;
	}
`;
const CardImgWrapper = styled.div`
	display: flex;
`;
const CardInfo = styled.div`
	display: flex;
	flex-direction: column;
`;
const CardInfoItem = styled.div`
	margin-bottom: 2rem;

	font-weight: bold;
	@media screen and (max-width: 970px) {
		font-size: 1.2rem;
		margin-bottom: 1.5rem;
	}
	@media screen and (max-width: 780px) {
		font-size: 1rem;
	}
	@media screen and (max-width: 645px) {
		font-size: 0.8rem;
	}

	@media screen and (max-width: 500px) {
		margin-bottom: 1rem;
	}
`;
const InfoIcon = styled.img`
	width: 1rem;
	height: 1rem;
	margin-right: 1rem;
`;
const CardImg = styled.img`
	width: 25rem;
	height: 100%;

	border-radius: 16px;
	box-shadow: 2px 1px 1px grey;
	@media screen and (max-width: 970px) {
		width: 20rem;
	}
	@media screen and (max-width: 780px) {
		width: 18rem;
	}
	@media screen and (max-width: 645px) {
		width: 14rem;
	}

	@media screen and (max-width: 500px) {
		width: 23rem;
		height: 13rem;
	}
`;

const ImgButton = styled.img`
	border-radius: 5px;
	padding-left: 1rem;
	width: 2.5rem;
	height: 2.5rem;
	@media screen and (max-width: 500px) {
		width: 2rem;
		height: 2rem;
		padding-right: 1.2rem;
	}
`;

const TitleWrapper = styled.div`
	display: flex;
`;
const StarWrapper = styled.div`
	width: 50rem;
`;

const ReviewWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 1rem;
	margin-bottom: 2rem;
	width: 50rem;
	@media screen and (max-width: 970px) {
		margin-bottom: 0;
		width: 11rem;
	}
	@media screen and (max-width: 500px) {
		width: 12rem;
		margin-bottom: 2rem;
	}
`;

const ReviewTextArea = styled.textarea`
	width: 50rem;
	height: 6rem;
	font-size: 1.2rem;
	border-radius: 16px;
	padding: 1rem;
	@media screen and (max-width: 970px) {
		margin-top: 0.5rem;
		width: 40rem;
		height: 5rem;
		flex-direction: column;
	}
	@media screen and (max-width: 780px) {
		width: 30rem;
	}
	@media screen and (max-width: 645px) {
		width: 24rem;
	}
	@media screen and (max-width: 500px) {
		padding: 1rem;
		width: 20rem;
		height: 12rem;
	}
`;
const SubmitBtn = styled.input`
	box-shadow: 2px 2px 1px grey;
	border: none;
	font-weight: bold;
	width: 12rem;
	height: 2.1rem;
	border-radius: 12px;
	background-color: #80e080;
	font-size: 1.3rem;
	color: white;
	text-align: center;
	&:hover {
		transform: scale(1.1);
	}
`;
const EmptyBorder = styled.div`
	@media screen and (max-width: 500px) {
		width: 100%;
		height: 20rem;
	}
`;
export default ReviewDetail;
