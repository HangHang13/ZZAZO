import { client } from "../utils/client";

//회원 본인 정보 조회
const getUser = async () => {
  const result = await client
    .get(`/users/me`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

//회원 정보 수정
const updateProfile = async (data) => {
  const result = await client
    .put(`/users/`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

const updatePassword = async (data) => {
  const result = await client
    .put(`/users/pw`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

const deleteProfile = async () => {
  const result = await client
    .delete(`/userEmail`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};
export { getUser, updateProfile, updatePassword, deleteProfile };
