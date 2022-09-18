import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div>404 Not Found😂</div>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <Link to="/">메인으로</Link>
    </div>
  );
};

export default NotFound;
