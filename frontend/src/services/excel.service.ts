import axios from "axios";

export const getTemplate = (groupId: string) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/excel/${groupId}`, {
      responseType: "arraybuffer",
    })
    .then((res) => res.data);
};
