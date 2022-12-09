import {
  IconButton,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WEEK_DAYS_DICT } from "../../../constants";
import { getEmployees } from "../../../services/employees";
import { getGroup } from "../../../services/group";
import { IColumn, IRow } from "../../../types/groupsTable";
import {
  getEmployeesData,
  getLabel2SubgroupIdDict,
  getScheduleData,
  scheduleRows2Subgroups,
  transformWorkshifts,
} from "./helper";
import EditIcon from "@mui/icons-material/Edit";
import Table from "./Table/Table";
import WeekDaysButtons from "./WeekDaysButtons";
import SubgroupDialog from "./SubgroupDialog";
import { ISubgroup } from "../../../types/subgroup";
import { createSubgroup, updateSubgroup } from "../../../services/subgroup";
import SaveIcon from "@mui/icons-material/Save";
import { format } from "date-fns";
import { updateWorkshifts } from "../../../services/workshift";
import AddIcon from "@mui/icons-material/Add";

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
  const [isEditingEmployees, setIsEditingEmployees] = useState(false);

  const [dateIni, setDateIni] = useState("2022-09-01");
  const [dateFin, setDateFin] = useState("2022-09-30");

  const [subgroups, setSubgroups] = useState<ISubgroup[]>([]);
  const [selectedSubgroup, setSelectedSubgroup] = useState<
    ISubgroup | undefined
  >();
  const [openScheduleDialog, setOpenScheduleDialog] = useState(false);
  const [dialogScheduleType, setDialogScheduleType] = useState<
    "edit" | "create"
  >("edit");

  const orderAndSetSubgroup = (
    value: React.SetStateAction<ISubgroup | undefined>
  ) => {
    setSelectedSubgroup((prevValue: ISubgroup | undefined) => {
      let newValue;

      if (typeof value === "object" || typeof value === "undefined") {
        newValue = prevValue;
      } else {
        newValue = value(prevValue);
      }

      if (newValue) {
        newValue.Break?.sort((a, b) => {
          return a.startTime.localeCompare(b.startTime);
        });

        return { ...newValue };
      }
    });
  };

  const handleCloseScheduleDialog = () => {
    setOpenScheduleDialog(false);
  };

  const handleWeekDayClick = (label: string) => () => {
    setSelectedWeekDays((selected) => {
      const idx = selected.findIndex((s) => s.label === label);
      selected[idx].selected = !selected[idx].selected;
      return [...selected];
    });
  };

  const handleClickCreateSchedule = () => {
    setDialogScheduleType("create");
    setOpenScheduleDialog(true);
    setSelectedSubgroup({
      id: "",
      startTime: "00:00",
      endTime: "00:00",
      Break: [],
    });
  };

  const handleClickEditSchedule = () => {
    setIsEditingSchedule((e) => !e);
  };

  const handleClickEditEmployees = () => {
    setIsEditingEmployees((e) => !e);
  };

  const handleClickSaveSchedule = async () => {
    const newSubgroups = scheduleRows2Subgroups(scheduleRows, scheduleCols);
    for (const row of newSubgroups) {
      await updateSubgroup(row.id, row);
    }
    setIsEditingSchedule(false);
    updateData();
  };

  const handleClickSaveEmployees = async () => {
    const label2SubgroupId = getLabel2SubgroupIdDict(subgroups);
    const workshifts = transformWorkshifts(
      employeesRows,
      employeesCols as IColumn[],
      label2SubgroupId
    );

    for (const workshiftsEmployee of workshifts) {
      await updateWorkshifts(
        { workshifts: Object.values(workshiftsEmployee)[0] },
        Object.keys(workshiftsEmployee)[0],
        dateIni,
        dateFin
      );
    }

    setIsEditingEmployees(false);
    updateData();
  };

  const handleClickSchedule = (id: string) => () => {
    if (!isEditingSchedule) {
      setDialogScheduleType("edit");
      const subgroup = subgroups.find((s) => s.id === id);
      if (subgroup) {
        setOpenScheduleDialog(true);
        setSelectedSubgroup(subgroup);
      }
    }
  };

  const updateData = async () => {
    if (!id) return;

    return getGroup(id).then((group) => {
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
  };

  const handleCreateScheduleDialog = async (data: any) => {
    if (selectedSubgroup)
      await createSubgroup({
        groupId: id,
        startTime: data.startTime,
        endTime: data.endTime,
        breaks: data.breaks,
      });
    setOpenScheduleDialog(false);
    updateData();
  };

  const handleEditScheduleDialog = async (data: any) => {
    if (selectedSubgroup) await updateSubgroup(selectedSubgroup.id, data);
    setOpenScheduleDialog(false);
    updateData();
  };

  const handleEditScheduleTable =
    (rowId: string) =>
    (colId: string) =>
    (value: any, keyboardInputValue?: string) => {
      setScheduleRows((prevVal) => {
        const rowIdx = prevVal.findIndex((val) => val.id === rowId);
        if (rowIdx !== -1) {
          if (keyboardInputValue !== undefined) {
            prevVal[rowIdx][colId] = keyboardInputValue;
          } else if (value) {
            prevVal[rowIdx][colId] = format(value, "HH:mm");
          }
        }

        return [...prevVal];
      });
    };

  const handleEditEmployeeTable =
    (rowId: string) =>
    (colId: string) =>
    (event: SelectChangeEvent<number>, child: React.ReactNode) => {
      setEmployeesRows((prevVal) => {
        const rowIdx = prevVal.findIndex((val) => val.id === rowId);
        if (rowIdx !== -1) {
          if (event.target.value === "") {
            delete prevVal[rowIdx][colId];
          } else {
            prevVal[rowIdx][colId] = event.target.value;
          }
        }

        return [...prevVal];
      });
    };

  useEffect(() => {
    updateData();
  }, [id]);

  return (
    <>
      <SubgroupDialog
        open={openScheduleDialog}
        onClose={handleCloseScheduleDialog}
        subgroup={selectedSubgroup}
        setSubgroup={orderAndSetSubgroup}
        onSubmit={
          dialogScheduleType === "edit"
            ? handleEditScheduleDialog
            : handleCreateScheduleDialog
        }
        isCreate={dialogScheduleType === "create"}
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
          <div style={{ marginTop: "auto" }}>
            <Tooltip title="Add schedule">
              <IconButton onClick={handleClickCreateSchedule}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit schedule">
              <IconButton onClick={handleClickEditSchedule}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save Changes">
              <IconButton
                disabled={!isEditingSchedule}
                onClick={handleClickSaveSchedule}
              >
                <SaveIcon />
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
            onChangeTime={handleEditScheduleTable}
          />
        </div>
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
            Employees
          </Typography>
          <div style={{ marginTop: "auto" }}>
            <Tooltip title="Edit Employees Dates">
              <IconButton onClick={handleClickEditEmployees}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save Changes">
              <IconButton
                disabled={!isEditingEmployees}
                onClick={handleClickSaveEmployees}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {employeesCols && (
          <Table
            columns={employeesCols}
            rows={employeesRows}
            cellStyle={{ whiteSpace: "nowrap" }}
            isEditing={isEditingEmployees}
            onChangeSelect={handleEditEmployeeTable}
            selectValues={subgroups.map((s, index) => index + 1)}
          />
        )}
      </Stack>
    </>
  );
}
