import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

export const client = axios.create({
  baseURL: BASE_URL,
});

// client.interceptors.request.use(function (config) {
//   config.headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
//   return config;
// });
