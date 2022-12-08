import axios from "axios";

export const updateWorkshifts = (
  data: any,
  employeeId: string,
  dateIni: string,
  dateFin: string
) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/workshifts`, data, {
    params: {
      employeeId,
      dateIni,
      dateFin,
    },
  });
};
