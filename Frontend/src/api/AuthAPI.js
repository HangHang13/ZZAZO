import { client } from "./../utils/client";
const login = async (data) => {
  const response = await client.post(`/users/login`, data);
};
