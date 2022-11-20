import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WEEK_DAYS_DICT } from "../../../constants";
import { getEmployees } from "../../../services/employees";
import { getGroup } from "../../../services/group";
import { IColumn, IRow } from "../../../types/groupsTable";
import { getScheduleData } from "./helper";
import Table from "./Table/Table";
import WeekDaysButtons from "./WeekDaysButtons";

const WEEK_DAYS_DEFAULT_ARRAY = Array(7)
  .fill(false)
  .map((selected, index) => ({
    selected,
    label: WEEK_DAYS_DICT[index].short,
  }));

export default function () {
  const { id } = useParams();

  const [scheduleCols, setScheduleCols] = useState<IColumn[]>([]);
  const [scheduleRows, setScheduleRows] = useState<IRow[]>([]);

  const [employeesCols, setEmployeesCols] = useState<IColumn[]>([
    { id: "employeeName" },
  ]);
  const [employeesRows, setEmployeesRows] = useState<IRow[]>([]);
  const [isScheduleConstant, setIsScheduleConstant] = useState(false);

  const [selectedWeekDays, setSelectedWeekDays] = useState(
    WEEK_DAYS_DEFAULT_ARRAY
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

    getEmployees({ groupId: id }).then(({ employees }) => {
      const employeesData = employees.map((e: any) => ({
        id: e.id,
        employeeName: e.name,
      }));

      setEmployeesRows(employeesData);
    });

    getGroup(id).then((group) => {
      setIsScheduleConstant(group.isConstant);

      setSelectedWeekDays((selected) => {
        group.weekDays.forEach((w) => {
          selected[w.value].selected = true;
        });
        return selected;
      });

      const [columnsData, rowsData] = getScheduleData(group);

      setScheduleCols(columnsData);
      setScheduleRows(rowsData);
    });
  }, [id]);

  return (
    <Stack style={{ height: "80vh" }} spacing={2}>
      {isScheduleConstant && (
        <WeekDaysButtons
          selectedWeekDays={selectedWeekDays}
          handleClick={handleWeekDayClick}
        />
      )}
      <Table columns={scheduleCols} rows={scheduleRows} />
      <Typography variant="h5">Employees</Typography>
      <Table
        style={{ overflowY: "auto" }}
        columns={employeesCols}
        rows={employeesRows}
      />
    </Stack>
  );
}
