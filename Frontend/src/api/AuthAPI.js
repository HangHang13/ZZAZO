import { client } from "./../utils/client";

const login = async (data) => {
  const result = await client
    .post(`/users/login`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

const emailDuplicateCheck = async (data) => {
  const result = await client
    .get(`/users/checkemail/${data}/`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

const nickNameDuplicateCheck = async (data) => {
  const result = await client
    .get(`/users/checkNickName/${data}/`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

const emailConfirm = async (data) => {
  alert(data);
};

export { login, emailDuplicateCheck, nickNameDuplicateCheck, emailConfirm };
