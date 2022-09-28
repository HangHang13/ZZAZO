import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";
// const BASE_URL = "http://j7b307.p.ssafy.io:8000/api/v1";

export const client = axios.create({
	baseURL: BASE_URL,
});

client.interceptors.request.use(function (config) {
	const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
	const refreshToken = sessionStorage.getItem("REFRESH_TOKEN");

	if (!accessToken || !refreshToken) {
		config.headers["Authorization"] = null;
		return config;
	}

	config.headers["Authorization"] = `Bearer ${accessToken}`;
	return config;
});
