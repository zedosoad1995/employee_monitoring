import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WEEK_DAYS_DICT } from "../../../constants";
import { getEmployees } from "../../../services/employees";
import { getGroup } from "../../../services/group";
import { IColumn, IRow } from "../../../types/groupsTable";
import { getEmployeesData, getScheduleData } from "./helper";
import EditIcon from "@mui/icons-material/Edit";
import Table from "./Table/Table";
import WeekDaysButtons from "./WeekDaysButtons";
import SubgroupDialog from "./SubgroupDialog";
import { ISubgroup } from "../../../types/subgroup";

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

  const [isEditingSchedule, setIsEditingSchedule] = useState(false);

  const [dateIni, setDateIni] = useState("2022-09-01");
  const [dateFin, setDateFin] = useState("2022-09-30");

  const [subgroups, setSubgroups] = useState<ISubgroup[]>([]);
  const [selectedSubgroup, setSelectedSubgroup] = useState<
    ISubgroup | undefined
  >();
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);

  const handleWeekDayClick = (label: string) => () => {
    setSelectedWeekDays((selected) => {
      const idx = selected.findIndex((s) => s.label === label);
      selected[idx].selected = !selected[idx].selected;
      return [...selected];
    });
  };

  const hancleClickEditSchedule = () => {
    setIsEditingSchedule((e) => !e);
  };

  const handleClickSchedule = (id: string) => () => {
    const subgroup = subgroups.find((s) => s.id === id);
    if (subgroup) {
      setOpenScheduleDialog(true);
      setSelectedSubgroup(subgroup);
    }
  };

  useEffect(() => {
    if (!id) return;

    getGroup(id).then((group) => {
      setSubgroups(group.subgroups);

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
    <>
      <SubgroupDialog
        open={openScheduleDialog}
        onClose={() => {}}
        subgroup={selectedSubgroup}
      />
      <Stack style={{ height: "80vh" }} spacing={2}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            style={{ marginTop: "auto", marginBottom: "auto" }}
            variant="h5"
          >
            Schedule
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div style={{ marginTop: "auto" }}>
            <Tooltip title="Edit schedule">
              <IconButton onClick={hancleClickEditSchedule}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {isScheduleConstant && (
          <WeekDaysButtons
            selectedWeekDays={selectedWeekDays}
            handleClick={handleWeekDayClick}
          />
        )}
        <div>
          <Table
            columns={scheduleCols}
            rows={scheduleRows}
            isEditing={isEditingSchedule}
            onClickRow={handleClickSchedule}
          />
        </div>
        <Typography variant="h5">Employees</Typography>
        {employeesCols && (
          <Table
            columns={employeesCols}
            rows={employeesRows}
            cellStyle={{ whiteSpace: "nowrap" }}
          />
        )}
      </Stack>
    </>
  );
}
