import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WEEK_DAYS_DICT } from "../../../constants";
import { getEmployees } from "../../../services/employees";
import { getGroup } from "../../../services/group";
import { IColumn, IRow } from "../../../types/groupsTable";
import { getEmployeesData, getScheduleData } from "./helper";
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

  const [employeesCols, setEmployeesCols] = useState<IColumn[]>();
  const [employeesRows, setEmployeesRows] = useState<IRow[]>([]);
  const [isScheduleConstant, setIsScheduleConstant] = useState(false);

  const [selectedWeekDays, setSelectedWeekDays] = useState(
    WEEK_DAYS_DEFAULT_ARRAY
  );

  const [dateIni, setDateIni] = useState("2022-09-01");
  const [dateFin, setDateFin] = useState("2022-09-30");

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
      getEmployees({
        groupId: id,
        displayWorkshifts: !group.isConstant,
        dateIni,
        dateFin,
      }).then(({ employees }) => {
        const [columnsData, rowsData] = getEmployeesData(
          group,
          employees,
          dateIni,
          dateFin
        );

        setEmployeesCols(columnsData);
        setEmployeesRows(rowsData);
      });

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
      <div>
        <Table columns={scheduleCols} rows={scheduleRows} />
      </div>
      <Typography variant="h5">Employees</Typography>
      {employeesCols && <Table columns={employeesCols} rows={employeesRows} />}
    </Stack>
  );
}
