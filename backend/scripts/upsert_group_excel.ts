import { format } from "date-fns";
import { readFile, utils } from "xlsx";

console.log(__dirname);

const workbook = readFile(`${__dirname}\\excel_example.xlsx`, {
  type: "binary",
  cellDates: true,
});

const sheet_name_list = workbook.SheetNames;
const data: Array<any> = utils.sheet_to_json(
  workbook.Sheets[sheet_name_list[0]],
  { header: 1 }
);

const tableIdxs = data
  .reduce((acc, row, idx) => {
    if (
      idx === 0 ||
      idx === data.length - 1 ||
      (row.length > 0 &&
        (data[idx - 1].length === 0 || data[idx + 1].length === 0))
    ) {
      acc.push(idx);
    }

    return acc;
  }, [])
  .reduce(
    (
      acc: Array<{ schedule: Array<number>; employees: Array<number> }>,
      num: number,
      idx: number
    ) => {
      if (idx % 4 === 0) {
        acc.push({ schedule: [num], employees: [] });
      } else if (idx % 4 === 1) {
        acc[acc.length - 1].schedule.push(num);
      } else if (idx % 4 >= 2) {
        acc[acc.length - 1].employees.push(num);
      }

      return acc;
    },
    []
  );

const groups: any = {};
let workShifts: any = [];

for (const tableIdx of tableIdxs) {
  const schedules = data.slice(tableIdx.schedule[0], tableIdx.schedule[1] + 1);
  const groupName = schedules[0][0];
  groups[groupName] = [];
  for (const schedule of schedules.slice(1)) {
    groups[schedules[0][0]].push({
      startTime: format(schedule[1], "HH:mm"),
      endTime: format(schedule.at(-1), "HH:mm"),
      breaks:
        schedule.length > 3
          ? schedule.slice(2, -1).reduce((acc: any, date: any, idx: number) => {
              if (idx % 2 === 0) {
                acc.push({ startTime: format(date, "HH:mm") });
              } else {
                acc[acc.length - 1].endTime = format(date, "HH:mm");
              }

              return acc;
            }, [])
          : [],
    });
  }

  const employees = data.slice(
    tableIdx.employees[0],
    tableIdx.employees[1] + 1
  );

  for (const employeeWorkshifts of employees.slice(1)) {
    workShifts = [
      ...workShifts,
      ...employeeWorkshifts
        .slice(2)
        .map((val: any, idx: number) => ({
          group: groupName,
          shift: groups[groupName][Number(val)],
          employee: employeeWorkshifts[0],
          date: format(employees[0][idx + 2], "yyyy-MM-dd"),
        }))
        .filter((val: any) => val.shift),
    ];
  }
}

console.log(groups, workShifts);
