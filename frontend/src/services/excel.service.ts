import axios from "axios";

export const getTemplate = (groupId: string) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/excel/${groupId}`, {
      responseType: "arraybuffer",
    })
    .then((res) => res.data);
};

export const upload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${process.env.REACT_APP_API_URL}/excel/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
