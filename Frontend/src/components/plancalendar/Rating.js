import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const ARRAY = [0, 1, 2, 3, 4];

function Rating() {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const ratings = clicked.filter(Boolean).length;

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {}, [clicked]);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
  };

  return (
    <Wrap>
      <Stars>
        {ARRAY.map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="40"
              onClick={() => handleStarClick(el)}
              className={clicked[el] && "yellowStar"}
            />
          );
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
