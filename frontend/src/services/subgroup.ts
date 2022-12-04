import axios from "axios";

export const updateSubgroup = (subgroupId: string, data: any) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/subgroups/${subgroupId}`,
    data
  );
};
