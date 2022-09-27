import axios from "axios";
import { response } from "express";
import { client } from "../utils/client";

const getReview = async (placeId) => {
  const result = await client
    .get(`${placeId}/review`)
    .then((rsponse) => response.data)
    .catch((error) => error.response);
  return result;
};

const postReview = async (placeId, data) => {
  const result = await client
    .post(`${placeId}/review`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return response;
};

const putReview = async (placeId, reviewId, data) => {
  const result = await client
    .post(`${placeId}/review/${reviewId}`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
};

export { getReview, postReview, putReview };
