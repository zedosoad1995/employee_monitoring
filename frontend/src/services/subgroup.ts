import axios from "axios";

export const updateSubgroup = (subgroupId: string, data: any) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/subgroups/${subgroupId}`,
    data
  );
};

export const createSubgroup = ({
  groupId,
  startTime,
  endTime,
  breaks,
}: any) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/subgroups`, {
    groupId,
    startTime,
    endTime,
    breaks,
  });
};

export const deleteSubgroup = (id: string) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/subgroups/${id}`);
};
