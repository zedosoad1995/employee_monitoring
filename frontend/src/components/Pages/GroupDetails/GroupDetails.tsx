import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WEEK_DAYS_DICT } from "../../../constants";
import { getGroup } from "../../../services/group";
import { IColumn, IRow } from "../../../types/groupsTable";
import ScheduleTable from "./Table/Table";

const onOffBaseArray = (val: number) => [
  {
    id: `on${val}`,
    label: "ON",
  },
  {
    id: `off${val}`,
    label: "OFF",
  },
];

export default function () {
  const { id } = useParams();

  const [columns, setColumns] = useState<IColumn[]>([]);
  const [rows, setRows] = useState<IRow[]>([]);

  const [selectedWeekDays, setSelectedWeekDays] = useState(
    Array(7)
      .fill(false)
      .map((selected, index) => ({
        selected,
        label: WEEK_DAYS_DICT[index].short,
      }))
  );

  const handleWeekDayClick = (label: string) => () => {
    setSelectedWeekDays((selected) => {
      const idx = selected.findIndex((s) => s.label === label);
      selected[idx].selected = !selected[idx].selected;
      return [...selected];
    });
  };

  useEffect(() => {
    if (!id) return;

    getGroup(id).then((group) => {
      setSelectedWeekDays((selected) => {
        group.weekDays.forEach((w) => {
          selected[w.value].selected = true;
        });
        return selected;
      });

      let columnsData: IColumn[] = [];

      if (!group.isConstant) {
        columnsData.push({
          id: "subgroupLabel",
        });
      }

      const maxNumOnOffs = Math.max(
        ...group.subgroups.map((subgroup) => subgroup.Break.length + 1)
      );

      const onOffCols = Array.from(Array(maxNumOnOffs).keys())
        .map((val) => [...onOffBaseArray(val)])
        .flat();

      columnsData = columnsData.concat(onOffCols);
      setColumns(columnsData);

      const rowsData: IRow[] = [];

      group.subgroups.forEach((subgroup, subgroupIdx) => {
        const rowData: any = {
          id: group.id,
        };

        const breakTimes = subgroup.Break.reduce<string[]>((acc, el) => {
          acc = acc.concat([el.startTime, el.endTime]);

          return acc;
        }, []);

        const timeArr = [subgroup.startTime, ...breakTimes, subgroup.endTime];

        onOffCols
          .map((arr) => arr.id)
          .forEach((id, index) => {
            rowData[id] = timeArr[index];
          });

        if (!group.isConstant) rowData.subgroupLabel = subgroupIdx + 1;

        rowsData.push(rowData);
      });

      setRows(rowsData);
    });
  }, [id]);

  return (
    <>
      <ScheduleTable columns={columns} rows={rows} />
      <ButtonGroup>
        {[...selectedWeekDays.slice(1, 7), selectedWeekDays[0]].map(
          (selected) => (
            <Button
              key={selected.label}
              variant={selected.selected ? "contained" : "outlined"}
              onClick={handleWeekDayClick(selected.label)}
            >
              {selected.label}
            </Button>
          )
        )}
      </ButtonGroup>
    </>
  );
}
