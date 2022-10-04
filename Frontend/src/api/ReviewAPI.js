import { client } from "../utils/client";

const getReview = async (placeId) => {
  const result = await client
    .get(`review/${placeId}`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

const postReview = async (placeId, data) => {
  console.log("등록 요청 api");
  console.log(data);
  const result = await client
    .post(`review/${placeId}`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

const putReview = async (placeId, reviewId, data) => {
  console.log("수정 api 요청데이터");
  console.log(data);
  const result = await client
    .put(`review/${placeId}/${reviewId}`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

export { getReview, postReview, putReview };
