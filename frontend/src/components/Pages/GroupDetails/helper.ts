import { IGroup } from "../../../types/group";
import { IColumn, IRow } from "../../../types/groupsTable";

const SUBGROUP_LABEL = "subgroupLabel";

const ON_OFF_BASE_ARRAY = (val: number) => [
  {
    id: `on${val}`,
    label: "ON",
  },
  {
    id: `off${val}`,
    label: "OFF",
  },
];

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

  group.subgroups.forEach((subgroup, subgroupIdx) => {
    const rowData: any = {
      id: subgroup.id,
      ...(!group.isConstant && { [SUBGROUP_LABEL]: subgroupIdx + 1 }),
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

  return rowsData;
};

export const getScheduleData = (group: IGroup) => {
  const [columnsData, onOffCols] = getScheduleCols(group);
  const rowsData = getScheduleRows(group, onOffCols);

  return [columnsData, rowsData];
};
