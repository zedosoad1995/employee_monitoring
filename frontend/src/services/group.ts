import axios from "axios";
import { IGroup } from "../types/group";

export const getGroups = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/groups`)
    .then((res) => res.data);
};

export const getGroupsShort = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/groups/short`)
    .then((res) => res.data);
};

export const getGroup = (groupId: string): Promise<IGroup> => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/groups/${groupId}`)
    .then((res) => res.data);
};

export const updateGroup = (groupId: string, data: any) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/groups/${groupId}`, data);
};

export const createGroup = (data: { name: string; isConstant: boolean }) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/groups`, data);
};

export const deleteGroup = (groupId: string) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/groups/${groupId}`);
};
