import { client } from "./../utils/client";

// 추천 목록 불러오기
const getRecommendList = async (data) => {
  const result = await client
    .post(`/place/recommend/`, data)
    .then((response) => response.data)
    .then((r) => console.log(r))
    .catch((error) => error.response);
  return result;
};

// 장소 목록 불러오기
const getPlaceList = async (placeType, data) => {
  const result = await client
    .post(`/place/list/${placeType}`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 약속 카드 작성
const savePlan = async (data) => {
  const result = await client
    .post(`/place/plan`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 약속 카드 리스트 정보
const getPlanList = async (data) => {
  const result = await client
    .get(`/plan/list`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 약속 카드 수정
const updatePlan = async (cardId, data) => {
  const result = await client
    .put(`/plan/${cardId}`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 약속 카드 삭제
const deletePlan = async (cardId) => {
  const result = await client
    .delete(`/plan/${cardId}`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 장소 카드 상세 정보
const getPlaceInfo = async (placeId) => {
  const result = await client
    .get(`/place/place/${placeId}`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 장소 리뷰 작성
const savePlaceReview = async (placeId, data) => {
  const result = await client
    .post(`/place/${placeId}/review`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 장소 리뷰 수정
const updatePlaceReview = async (placeId, reviewId, data) => {
  const result = await client
    .put(`/place/${placeId}/review/${reviewId}`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 장소 리뷰 삭제
const deletePlaceReview = async (placeId, reviewId) => {
  const result = await client
    .delete(`/${placeId}/${reviewId}`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

export {
  getRecommendList,
  getPlaceList,
  savePlan,
  getPlanList,
  updatePlan,
  deletePlan,
  getPlaceInfo,
  savePlaceReview,
  updatePlaceReview,
  deletePlaceReview,
};
