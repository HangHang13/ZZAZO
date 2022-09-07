import axios from "axios";

//const BASE_URL = "http://localhost:8080/api/v1";
const BASE_URL = "/";

export const client = axios.create({
	baseURL: BASE_URL,
});

client.interceptors.request.use(function (config) {
	console.log(config);
	console.log("interceptor");
});
