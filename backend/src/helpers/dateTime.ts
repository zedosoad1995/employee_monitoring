export const getMinsFromTimeStr = (str: string) => {
  let [hh, mm] = str.split(":");
  return Number(hh) * 60 + Number(mm);
};

export const getTimeStrFromMins = (totalMins: number) => {
  let tempMins = Math.abs(totalMins);

  const hours = Math.floor(tempMins / 60);
  const mins = tempMins - hours * 60;
  if (totalMins < 0) {
    return `-${String(hours).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}`;
  }

  return `+${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

export const getDateRange = (
  dataIni: Date | string,
  dateFin: Date | string
) => {
  let dateTmp = new Date(dataIni);
  let arr = [];

  while (dateTmp <= new Date(dateFin)) {
    arr.push(new Date(dateTmp));
    dateTmp.setDate(dateTmp.getDate() + 1);
  }

  return arr;
};
