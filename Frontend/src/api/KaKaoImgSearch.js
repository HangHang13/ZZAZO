import axios from "axios";

const kakao = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAOREST_KEY}`,
  },
});

export const ImgSearch = (params) => {
  return kakao.get("/v2/search/image", { params });
};
