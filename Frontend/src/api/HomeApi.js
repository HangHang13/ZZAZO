import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/v1";
const BASE_URL = "http://j7b307.p.ssafy.io:8000/api/v1";

const main = axios.create({
  baseURL: BASE_URL,
});

// const getRec = async () => {
//   const result = await main
//     .get(`/home/`)
//     .then((response) => {
//       console.log(response.data.Place);
//     })
//     .catch((error) => error.response);
// };

const getRec = async () => {
  const result = await main
    .get(`/home/`)
    .then((response) => response.data)
    .catch((error) => error.response);

  return result;
};
export { getRec };
