import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

export const client = axios.create({
  baseURL: BASE_URL,
});

// client.interceptors.request.use(function (config) {
// 	console.log(config);
// 	console.log("interceptor");
// });
