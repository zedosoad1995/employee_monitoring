import axios from "axios";

export const getEmployees = (params: any = {}) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/employees`, { params })
    .then((res) => res.data);
};

export const getEmployeesShort = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/employees/short`)
    .then((res) => res.data);
};

export const getEmployee = (employeeId: string) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`)
    .then((res) => res.data);
};

export const updateEmployee = (employeeId: string, data: any) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/employees/${employeeId}`,
    data
  );
};

export const createEmployee = (data: any) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/employees`, data);
};

export const deleteEmployee = (employeeId: string) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/employees/${employeeId}`
  );
};
