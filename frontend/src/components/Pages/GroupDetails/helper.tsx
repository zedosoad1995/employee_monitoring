import { dateToStr, getDateRange } from "../../../helpers/dateTime";
import { IGroup } from "../../../types/group";
import { IColumn, IRow, CellType } from "../../../types/groupsTable";
import { ISubgroupBody } from "../../../types/subgroup";
import { IUpdateWorkshiftBody } from "../../../types/workshift";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const SUBGROUP_LABEL = "subgroupLabel";
const MORE_OPTIONS_LABEL = "moreOptionsLabel";

const MoreOptionsSchedule: React.FC<{
  isConstant: boolean;
  onEdit: () => Promise<void>;
  onDelete: () => Promise<void>;
}> = ({ isConstant, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | undefined
  >();
  const [open, setOpen] = useState(false);

  const handleEdit = async () => {
    await onEdit();
    setOpen(false);
  };

  const handleDelete = async () => {
    await onDelete();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit Schedule</MenuItem>
        {!isConstant && (
          <MenuItem onClick={handleDelete}>Delete Schedule</MenuItem>
        )}
      </Menu>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
    </>
  );
};

const ON_OFF_BASE_ARRAY = (val: number): IColumn[] => [
  {
    id: `on${val}`,
    label: "ON",
    canEdit: true,
    type: CellType.TIME,
  },
  {
    id: `off${val}`,
    label: "OFF",
    canEdit: true,
    type: CellType.TIME,
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

export const getLabel2SubgroupIdDict = (subgroups: { id: string }[]) => {
  const subgroupId2Label = getSubgroupId2LabelDict(subgroups);
  return Object.fromEntries(
    Object.entries(subgroupId2Label).map(([k, v]) => [v, k])
  );
};

const getScheduleCols = (group: IGroup) => {
  const columnsData: IColumn[] = [];

  columnsData.push({
    id: MORE_OPTIONS_LABEL,
  });

  if (!group.isConstant) {
    columnsData.push({
      id: SUBGROUP_LABEL,
    });
  }

  const maxNumOnOffs =
    group.subgroups.length > 0
      ? Math.max(
          ...group.subgroups.map((subgroup) =>
            subgroup.Break ? subgroup.Break.length + 1 : 1
          )
        )
      : 0;

  const onOffCols = Array.from(Array(maxNumOnOffs).keys())
    .map((val) => [...ON_OFF_BASE_ARRAY(val)])
    .flat();

  return [columnsData.concat(onOffCols), onOffCols];
};

const getScheduleRows = (
  group: IGroup,
  onOffCols: IColumn[],
  handleEditSchedule: (id: string) => () => Promise<void>,
  handleDeleteSchedule: (id: string) => () => Promise<void>
) => {
  const rowsData: IRow[] = [];

  const subgroupId2Label = getSubgroupId2LabelDict(group.subgroups);

  group.subgroups.forEach((subgroup) => {
    const rowData: any = {
      id: subgroup.id,
      [MORE_OPTIONS_LABEL]: (
        <MoreOptionsSchedule
          isConstant={group.isConstant}
          onEdit={handleEditSchedule(subgroup.id)}
          onDelete={handleDeleteSchedule(subgroup.id)}
        />
      ),
      ...(!group.isConstant && {
        [SUBGROUP_LABEL]: subgroupId2Label[subgroup.id],
      }),
    };

    const breakTimes = subgroup.Break
      ? subgroup.Break.reduce<string[]>((acc, el) => {
          acc = acc.concat([el.startTime, el.endTime]);

          return acc;
        }, [])
      : [];

    const timesArr = [subgroup.startTime, ...breakTimes, subgroup.endTime];

    onOffCols.slice(0, timesArr.length).forEach(({ id }, index) => {
      rowData[id] = timesArr[index];
    });

    rowsData.push(rowData);
  });

  rowsData.sort((a, b) => a.id.localeCompare(b.id));

  return rowsData;
};

export const getScheduleData = (
  group: IGroup,
  handleEditSchedule: (id: string) => () => Promise<void>,
  handleDeleteSchedule: (id: string) => () => Promise<void>
) => {
  const [columnsData, onOffCols] = getScheduleCols(group);
  const rowsData = getScheduleRows(
    group,
    onOffCols,
    handleEditSchedule,
    handleDeleteSchedule
  );

  return [columnsData, rowsData];
};

export const scheduleRows2Subgroups = (rows: IRow[], cols: IColumn[]) => {
  cols = cols.filter((col) => col.canEdit);
  return rows.map((row) => {
    const definedCols = cols.filter((col) => row[col.id]);

    return definedCols.reduce(
      (acc: ISubgroupBody, col, index) => {
        if (index === 0) {
          acc.startTime = row[col.id];
        } else if (index === definedCols.length - 1) {
          acc.endTime = row[col.id];
        } else if (index % 2 === 1) {
          acc.breaks?.push({ id: "", startTime: row[col.id], endTime: "" });
        } else {
          if (acc.breaks)
            acc.breaks[acc.breaks?.length - 1].endTime = row[col.id];
        }

        return acc;
      },
      { id: row.id, startTime: "", endTime: "", breaks: [] }
    );
  });
};

export const transformWorkshifts = (
  rows: IRow[],
  cols: IColumn[],
  label2SubgroupId: {
    [k: string]: string;
  }
) => {
  cols = cols.filter((col) => col.canEdit);

  return rows.map((row) => ({
    [row.id]: cols.reduce<IUpdateWorkshiftBody[]>((acc, col) => {
      if (row[col.id]) {
        acc.push({
          date: col.id,
          subgroupId: label2SubgroupId[row[col.id]],
        });
      }

      return acc;
    }, []),
  }));
};

const getEmployeesCols = (group: any, dateIni: string, dateFin: string) => {
  const columnsData: IColumn[] = [{ id: "employeeName" }];

  if (!group.isConstant) {
    const dateRange = getDateRange(dateIni, dateFin);

    dateRange.forEach((date) => {
      columnsData.push({
        id: dateToStr(date),
        label: dateToStr(date, "M/dd"),
        canEdit: true,
        type: CellType.SELECT,
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
