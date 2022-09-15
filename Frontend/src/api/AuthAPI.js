import { client } from "./../utils/client";

// 회원가입
const signup = async (data) => {
  const result = await client
    .post(`/users/signup/`, data)
    .then((response) => response.data)
    .catch((error) => error.response);

  return result;
};

// 로그인
const login = async (data) => {
  const result = await client
    .post(`/users/login/`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 이메일 중복 검사
const emailDuplicateCheck = async (data) => {
  const result = await client
    .get(`/users/checkemail/${data}/`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 닉네임 중복 검사
const nickNameDuplicateCheck = async (data) => {
  const result = await client
    .get(`/users/checkNickName/${data}/`)
    .then((response) => response.data)
    .catch((error) => error.response);
  return result;
};

// 이메일 인증 메일 발송
const emailSendConfirm = async (data) => {
  alert(data);
};

// 이메일 인증
const emailConfirm = async (data) => {
  alert(data);
};

export {
  login,
  emailDuplicateCheck,
  nickNameDuplicateCheck,
  emailConfirm,
  signup,
};
