import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IColumn, IRow } from "../../../types/groupsTable";
import ScheduleTable from "./Table/Table";

const columns: IColumn[] = [
  {
    id: "subgroupLabel",
    isHidden: false,
  },
  ...Array.from(Array(4).keys())
    .map((val) => [
      {
        id: `on${val}`,
        label: "ON",
      },
      {
        id: `off${val}`,
        label: "OFF",
      },
    ])
    .flat(),
];

const rows: IRow[] = [
  {
    id: "1",
    subgroupLabel: 1,
    on0: "9:00",
    off0: "10:00",
    on1: "10:15",
    off1: "12:00",
    on2: "13:00",
    off2: "15:00",
    on3: "15:15",
    off3: "18:00",
  },
  {
    id: "2",
    subgroupLabel: 2,
    on0: "8:00",
    off0: "10:30",
    on1: "10:45",
    off1: "12:00",
    on2: "13:00",
    off2: "15:15",
    on3: "15:30",
    off3: "17:30",
  },
];

export default function () {
  useEffect(() => {}, []);

  return <ScheduleTable columns={columns} rows={rows} />;
}
