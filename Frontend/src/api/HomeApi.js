import axios from "axios";

import { client } from "./../utils/client";

const getRec = async () => {
  const result = await client
    .get(`/zzazohome`)
    .then((response) => response.data)
    .catch((error) => error.response);

  return result;
};
export { getRec };
