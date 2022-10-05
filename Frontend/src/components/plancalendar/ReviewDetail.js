import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { getReview, postReview, putReview } from "../../api/ReviewAPI";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

//title : 장소명
//address : 주소
//category : 장소 카테고리
//target : 주요 이용 고객
//score : 별점
const ARRAY = [0, 1, 2, 3, 4];

const ReviewDetail = ({ myrating, modalClose, placeinfo, placeid }) => {
  /**카드 이미지 경로 */
  function imgPath(placeinfo) {
    switch (placeinfo.placeUrl) {
      case null:
        return `${process.env.PUBLIC_URL}/assets/card/categoryImg/default.png`;
      default:
        return placeinfo.placeUrl;
    }
  }

  let searchTitle = placeinfo.name.replace(/ /g, "");
  const authenticated = useSelector((state) => state.user.value.isLogin);
  /** 별점관련 부분 **/
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const ratings = clicked.filter(Boolean).length;
  /** 별점 변경 */
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    setreview({ ...review, ["score"]: clicked.filter(Boolean).length });
  };
  /** 카드 정보 조회 **/
  const [cardContent, setcardContent] = useState(false);
  /** 리뷰 내용 **/
  const [reviewcontents, setreviewcontents] = useState("");
  /** 기존에 리뷰가 있는지 유무 **/
  const [isreview, setisreview] = useState(false);
  /** 리뷰 id */
  const [reviewid, setreviewid] = useState(0);

  const ReviewCardLoad = async () => {
    /* place Id로 리뷰 정보 조회 */
    const ReviewCardData = await getReview(placeid);
    setcardContent(ReviewCardData);
    if (ReviewCardData.data.reviews != "") {
      setisreview(true);
      setreviewcontents(ReviewCardData.data.reviews.content);
      setreviewid(ReviewCardData.data.reviews.id);
    }
    return ReviewCardData;
  };
  /** 새 리뷰 등록 post api **/
  const [review, setreview] = useState({
    content: "",
    score: 0,
  });
  const WriteReview = (val, rating) => {
    setreview({ ...review, ["score"]: rating, ["content"]: val });
  };

  //리뷰 등록
  const CreateReview = async () => {
    alert("리뷰가 등록되었습니다.");
    const result = await postReview(placeid, review);
  };
  //리뷰 수정
  const UpdateReview = async () => {
    alert("리뷰가 수정되었습니다.");
    const result = await putReview(placeid, reviewid, review);
    modalClose();
  };

  useEffect(() => {
    let clickStates = [...clicked];
    for (let i = 0; i < myrating; i++) {
      clickStates[i] = true;
    }
    setClicked(clickStates);
    //초기 카드 정보 조회
    ReviewCardLoad();
  }, [myrating]);

  return (
    <Background>
      <CardWrapper>
        <ExitBtnWrapper>
          <ImgButton src={`${process.env.PUBLIC_URL}/assets/card/exit.png`} alt="exit" onClick={modalClose}></ImgButton>
        </ExitBtnWrapper>
        <TitleWrapper>
          {cardContent ? (
            <>
              <CardTitle>{placeinfo.name}</CardTitle>
            </>
          ) : (
            <></>
          )}

          <a href={`https://www.instagram.com/explore/tags/${searchTitle}/?hl=ko`} target="_blank">
            <ImgButton src={`${process.env.PUBLIC_URL}/assets/card/insta.png`} alt="insta"></ImgButton>
          </a>
        </TitleWrapper>

        <CardLine width="80%"></CardLine>
        <CardMainWrapper>
          <CardInfoWrapper>
            <CardInfo>
              {cardContent ? (
                <>
                  <CardInfoItem>
                    <InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/location.png`} alt="location"></InfoIcon>
                    {placeinfo.address}
                  </CardInfoItem>
                  <CardInfoItem>
                    <InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/category.png`} alt="location"></InfoIcon>
                    {placeinfo.place_type}
                  </CardInfoItem>
                  <CardInfoItem>
                    {placeinfo.popularGender == "male" ? (
                      <>
                        <InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/man.png`} alt="location"></InfoIcon>
                      </>
                    ) : (
                      <>
                        <InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/women.png`} alt="location"></InfoIcon>
                      </>
                    )}
                    {placeinfo.popularAge == "만족없음" ? "" : placeinfo.popularAge} {placeinfo.popularGender == "male" ? "남성" : "여성"}이 많이 이용해요.
                  </CardInfoItem>
                  <CardInfoItem>
                    <InfoIcon src={`${process.env.PUBLIC_URL}/assets/card/star.png`} alt="location"></InfoIcon>
                    {placeinfo.placeScore ? <>{placeinfo.placeScore}</> : "별점을 입력해주세요"}
                  </CardInfoItem>
                </>
              ) : (
                <></>
              )}
            </CardInfo>
          </CardInfoWrapper>
          <CardImgWrapper>
            <CardImg src={imgPath(placeinfo)}></CardImg>
          </CardImgWrapper>
        </CardMainWrapper>
        <EmptyBorder></EmptyBorder>
        <EmptyBorder></EmptyBorder>
        {authenticated && (
          <>
            <CardLine width="80%"></CardLine>
            <StarWrapper>
              <Wrap>
                <Stars>
                  {ARRAY.map((el, idx) => {
                    return <FaStar key={idx} size="40" onClick={() => handleStarClick(el)} className={clicked[el] && "yellowStar"} />;
                  })}
                </Stars>
                <StarText>{ratings}/5</StarText>
              </Wrap>
            </StarWrapper>
          </>
        )}

        {authenticated && isreview && (
          <>
            <ReviewTextArea
              value={reviewcontents}
              onChange={(e) => {
                setreviewcontents(e.target.value);
              }}
              onMouseOut={(e) => {
                WriteReview(e.currentTarget.value, ratings);
              }}
            ></ReviewTextArea>

            <ReviewWrapper>
              <SubmitBtn onClick={() => UpdateReview(review)} defaultValue="리뷰 수정"></SubmitBtn>
            </ReviewWrapper>
          </>
        )}

        {authenticated && !isreview && (
          <>
            <ReviewTextArea
              name="content"
              onMouseOut={(e) => {
                WriteReview(e.currentTarget.value, ratings);
              }}
            ></ReviewTextArea>

            <ReviewWrapper>
              <SubmitBtn onClick={() => CreateReview(review)} defaultValue="리뷰 등록"></SubmitBtn>
            </ReviewWrapper>
          </>
        )}
      </CardWrapper>
    </Background>
  );
};

const authBorder = styled.div`
  width: 100%;
  font-size: 2rem;
  height: 1.5rem;
`;

const Wrap = styled.div`
  display: flex;
  width: 18rem;
  justify-content: center;
  flex-direction: column;
`;
const StarText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  @media screen and (max-width: 500px) {
    margin-bottom: 0.5rem;
  }
`;

const Stars = styled.div`
  .yellowStar {
    fill: #fcc419;
  }
  & svg {
    color: gray;
    cursor: pointer;
  }
  :hover svg {
    color: #fcc419;
  }
  & svg:hover ~ svg {
    color: gray;
  }
`;

const Background = styled.div`
  z-index: 9999;
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
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 55rem;

  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
  margin-bottom: 3rem;

  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  z-index: 100;
  @media screen and (max-height: 600px) {
    top: 80%;
  }
  @media screen and (max-width: 970px) {
    width: 45rem;
    flex-direction: column;
  }
  @media screen and (max-width: 780px) {
    width: 36rem;
    flex-direction: column;
  }
  @media screen and (max-width: 645px) {
    width: 30rem;
    flex-direction: column;
  }
  @media screen and (max-width: 500px) {
    top: 80%;
    width: 27rem;
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

  width: 50rem;
  @media screen and (max-width: 970px) {
    margin-bottom: 0;
    width: 11rem;
  }
  @media screen and (max-width: 500px) {
    width: 12rem;
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
    margin-top: 3rem;
  }
`;

export default ReviewDetail;
