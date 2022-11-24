import { dateToStr, getDateRange } from "../../../helpers/dateTime";
import { IGroup } from "../../../types/group";
import { IColumn, IRow } from "../../../types/groupsTable";

const SUBGROUP_LABEL = "subgroupLabel";

const ON_OFF_BASE_ARRAY = (val: number): IColumn[] => [
  {
    id: `on${val}`,
    label: "ON",
    canEdit: true,
  },
  {
    id: `off${val}`,
    label: "OFF",
    canEdit: true,
  },
];

export const getSubgroupId2LabelDict = (subgroups: { id: string }[]) => {
  const subgroupsCpy = [...subgroups];

  subgroupsCpy.sort((a, b) => a.id.localeCompare(b.id));

  return subgroupsCpy.reduce<{ [key: string]: number }>(
    (acc, { id }, index) => {
      acc[id] = index + 1;

      return acc;
    },
    {}
  );
};

const getScheduleCols = (group: IGroup) => {
  const columnsData: IColumn[] = [];

  if (!group.isConstant) {
    columnsData.push({
      id: SUBGROUP_LABEL,
    });
  }

  const maxNumOnOffs = Math.max(
    ...group.subgroups.map((subgroup) => subgroup.Break.length + 1)
  );

  const onOffCols = Array.from(Array(maxNumOnOffs).keys())
    .map((val) => [...ON_OFF_BASE_ARRAY(val)])
    .flat();

  return [columnsData.concat(onOffCols), onOffCols];
};

const getScheduleRows = (group: IGroup, onOffCols: IColumn[]) => {
  const rowsData: IRow[] = [];

  const subgroupId2Label = getSubgroupId2LabelDict(group.subgroups);

  group.subgroups.forEach((subgroup) => {
    const rowData: any = {
      id: subgroup.id,
      ...(!group.isConstant && {
        [SUBGROUP_LABEL]: subgroupId2Label[subgroup.id],
      }),
    };

    const breakTimes = subgroup.Break.reduce<string[]>((acc, el) => {
      acc = acc.concat([el.startTime, el.endTime]);

      return acc;
    }, []);

    const timesArr = [subgroup.startTime, ...breakTimes, subgroup.endTime];

    onOffCols.forEach(({ id }, index) => {
      rowData[id] = timesArr[index];
    });

    rowsData.push(rowData);
  });

  rowsData.sort((a, b) => a.id.localeCompare(b.id));

  return rowsData;
};

export const getScheduleData = (group: IGroup) => {
  const [columnsData, onOffCols] = getScheduleCols(group);
  const rowsData = getScheduleRows(group, onOffCols);

  return [columnsData, rowsData];
};

const getEmployeesCols = (group: any, dateIni: string, dateFin: string) => {
  const columnsData: IColumn[] = [{ id: "employeeName" }];

  if (!group.isConstant) {
    const dateRange = getDateRange(dateIni, dateFin);

    dateRange.forEach((date) => {
      columnsData.push({
        id: dateToStr(date),
        label: dateToStr(date, "M/dd"),
      });
    });
  }

  return columnsData;
};

const getEmployeesRows = (
  group: any,
  employees: any,
  dateIni: string,
  dateFin: string
) => {
  let rowsData;

  if (!group.isConstant) {
    const subgroupId2Label = getSubgroupId2LabelDict(group.subgroups);
    const dateRange = getDateRange(dateIni, dateFin);

    rowsData = employees.map((e: any) => {
      const ret: any = {
        id: e.id,
        employeeName: e.name,
      };

      dateRange.forEach((date) => {
        const workshift = e.WorkShift.find(
          (ws: any) => ws.date === dateToStr(date)
        );

        if (workshift) {
          ret[dateToStr(date)] = subgroupId2Label[workshift.subgroupId];
        }
      });

      return ret;
    });
  } else {
    rowsData = employees.map((e: any) => ({
      id: e.id,
      employeeName: e.name,
    }));
  }

  return rowsData;
};

export const getEmployeesData = (
  group: any,
  employees: any,
  dateIni: string,
  dateFin: string
) => {
  const columnsData = getEmployeesCols(group, dateIni, dateFin);
  const rowsData = getEmployeesRows(group, employees, dateIni, dateFin);

  return [columnsData, rowsData];
};
