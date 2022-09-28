import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const ARRAY = [0, 1, 2, 3, 4];

// const Save = 3;  //저장된 스코어
// let clickStatess = [...clicked];
// for (let i = 0; i < Save; i++){
//   clickStatess[i] = true;
// }

function Rating() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const ratings = clicked.filter(Boolean).length;

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    // console.log(clickStates);
    // console.log(clicked.filter(Boolean).length);
  };

  useEffect(() => {
    //호출해서 값 가져오고
    //useEffect 처음호출시에만
    // sendReview();
  }, [clicked]);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    // fetch(`${config.api}/movie/`, {
    //   method: "POST",
    //   Headers: {
    //     Authroization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMH0.8ea-EYWNQ4Orfazh5Y7SNxhKcnfhhIt4QySLGfg3xt4",
    //   },
    //   body: JSON.stringify({
    //     movie_id: 1,
    //     star: score,
    //   }),
    // });
  };

  return (
    <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => {
          return <FaStar key={idx} size="40" onClick={() => handleStarClick(el)} className={clicked[el] && "yellowStar"} />;
        })}
      </Stars>
      <StarText>{ratings}/5</StarText>
    </Wrap>
  );
}

export default Rating;

const Wrap = styled.div`
  display: flex;
  width: 18rem;
  justify-content: center;
  flex-direction: column;
`;
const StarText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
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
