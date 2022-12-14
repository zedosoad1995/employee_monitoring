import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroups,
  updateGroup,
} from "../../../services/group";
import { HeadCell } from "../../../types/table";
import GroupsTable from "../../Table/Table";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import {
  Button,
  DialogActions,
  DialogContentText,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DialogContent } from "@mui/material";
import Box from "@mui/system/Box";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { format, parse } from "date-fns";
import { useNavigate } from "react-router-dom";

import CreateGroupDialog from "./CreateGroupDialog";

const schema = yup.object().shape({
  name: yup.string().required(),
  startTime: yup
    .date()
    .typeError("Invalid Date")
    .required()
    .test("is-smaller", "Start Time should be smaller", function (value) {
      const { endTime } = this.parent;
      if (isNaN(endTime)) return true;
      if (!value) return false;
      return format(value, "HH:mm") < format(endTime, "HH:mm");
    }),
  endTime: yup
    .date()
    .typeError("Invalid Date")
    .required()
    .test("is-greater", "End Time should be greater", function (value) {
      const { startTime } = this.parent;
      if (isNaN(startTime)) return true;
      if (!value) return false;
      return format(value, "HH:mm") > format(startTime, "HH:mm");
    }),
  breaks: yup.array().of(
    yup.object().shape({
      startTime: yup
        .date()
        .typeError("Invalid Date")
        .required()
        .test(
          "is-smaller-break",
          "Start Time should be smaller",
          function (value) {
            const { endTime } = this.parent;
            if (isNaN(endTime)) return true;
            if (!value) return false;
            return format(value, "HH:mm") < format(endTime, "HH:mm");
          }
        ),
      endTime: yup
        .date()
        .typeError("Invalid Date")
        .required()
        .test(
          "is-greater-break",
          "End Time should be greater",
          function (value) {
            const { startTime } = this.parent;
            if (isNaN(startTime)) return true;
            if (!value) return false;
            return format(value, "HH:mm") > format(startTime, "HH:mm");
          }
        ),
    })
  ),
});

const columns: Array<HeadCell> = [
  {
    id: "name",
    label: "Name",
    numeric: false,
  },
  {
    id: "startTime",
    label: "Start Time",
    numeric: false,
  },
  {
    id: "endTime",
    label: "End Time",
    numeric: false,
  },
  {
    id: "edit",
    label: "",
    numeric: false,
    sortable: false,
    isIcon: true,
  },
  {
    id: "delete",
    label: "",
    numeric: false,
    sortable: false,
    isIcon: true,
  },
];

function Groups() {
  const [rows, setRows] = useState(null);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openDeleteGroup, setOpenDeleteGroup] = useState(false);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [breaks, setBreaks] = useState<Array<{ startTime: any; endTime: any }>>(
    []
  );

  const [isCreateGroup, setIsCreateGroup] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>();

  const navigate = useNavigate();

  const onClickRow = (groupId: string) => () => {
    navigate(groupId);
  };

  const handleChangeStartBreak =
    (index: number) => (newValue: any, keyboardInputValue: any) => {
      const newTime =
        keyboardInputValue && keyboardInputValue.length !== 5
          ? new Date("")
          : newValue;

      setBreaks((b: any) => {
        b[index].startTime = newTime;
        return [...b];
      });
      setValue(`breaks.${index}.startTime`, newTime);
    };

  const handleChangeEndBreak =
    (index: number) => (newValue: any, keyboardInputValue: any) => {
      const newTime =
        keyboardInputValue && keyboardInputValue.length !== 5
          ? new Date("")
          : newValue;

      setBreaks((b: any) => {
        b[index].endTime = newTime;
        return [...b];
      });
      setValue(`breaks.${index}.endTime`, newTime);
    };

  const handleClickAddNewBreak = () => {
    setBreaks((b: any) => [
      ...b,
      { startTime: new Date(), endTime: new Date() },
    ]);
  };

  const handleClickRemoveBreak = (index: number) => () => {
    let breaksUpdated;
    setBreaks((b: any) => {
      breaksUpdated = b.filter((val: any, i: number) => i !== index);
      for (let i = 0; i < breaksUpdated.length; i++) {
        setValue(`breaks.${i}.startTime`, breaksUpdated[i].startTime);
        setValue(`breaks.${i}.endTime`, breaksUpdated[i].endTime);
      }
      return breaksUpdated;
    });
  };

  const handleClickAddGroup = () => {
    clearErrors();
    reset();
    setStartTime(new Date());
    setEndTime(new Date());
    setBreaks([]);

    setIsCreateGroup(true);
    setOpenCreateGroup(true);
  };

  const handleCloseAddGroup = () => {
    setOpenCreateGroup(false);
  };

  const handleClickEditGroup = (groupId: string) => async () => {
    clearErrors();
    setSelectedGroup(groupId);
    setIsCreateGroup(false);
    const group = await getGroup(groupId);

    const currStartTime = parse(
      group.subgroups[0].startTime,
      "HH:mm",
      new Date()
    );
    const currEndTime = parse(group.subgroups[0].endTime, "HH:mm", new Date());
    const currBreaks = group.subgroups[0].Break
      ? group.subgroups[0].Break.map((b: any) => ({
          startTime: parse(b.startTime, "HH:mm", new Date()),
          endTime: parse(b.endTime, "HH:mm", new Date()),
        }))
      : [];

    setValue("name", group.name);
    setValue("startTime", currStartTime);
    setValue("endTime", currEndTime);
    setValue("breaks", currBreaks);

    setStartTime(currStartTime);
    setEndTime(currEndTime);
    setBreaks(currBreaks);

    setOpenCreateGroup(true);
  };

  const handleClickDeleteGroup =
    (groupId: string) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setSelectedGroup(groupId);
      setOpenDeleteGroup(true);
    };

  const handleDeleteGroup = async () => {
    if (selectedGroup !== undefined) await deleteGroup(selectedGroup);
    await getData();
    setOpenDeleteGroup(false);
  };

  const handleCloseDeleteGroup = () => {
    setOpenDeleteGroup(false);
  };

  const getData = async () => {
    const { groups } = await getGroups();
    const rows = groups.map((g: any, index: number) => ({
      id: g.id,
      name: g.name,
      startTime: g.startTime,
      endTime: g.endTime,
      edit: (
        <>
          {
            <Tooltip key={g.id} title="Edit Group">
              <IconButton onClick={handleClickEditGroup(g.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          }
        </>
      ),
      delete: (
        <>
          {
            <Tooltip key={g.id} title="Delete Group">
              <IconButton onClick={handleClickDeleteGroup(g.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
        </>
      ),
    }));
    setRows(rows);
  };

  useEffect(() => {
    getData();
  }, [openCreateGroup]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm<{
    name: string;
    startTime: Date;
    endTime: Date;
    breaks: Array<{ startTime: Date; endTime: Date }>;
  }>({
    defaultValues: {
      name: "",
      startTime: new Date(),
      endTime: new Date(),
      breaks: [],
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const prepareSubmit = async (data: any) => {
    data.startTime = format(data.startTime, "HH:mm");
    data.endTime = format(data.endTime, "HH:mm");
    for (let i = 0; i < data.breaks.length; i++) {
      data.breaks[i].startTime = format(data.breaks[i].startTime, "HH:mm");
      data.breaks[i].endTime = format(data.breaks[i].endTime, "HH:mm");
    }

    if (isCreateGroup) {
      await createGroup(data);
    } else if (selectedGroup) {
      await updateGroup(selectedGroup, data);
    }
    await getData();
    setOpenCreateGroup(false);
  };

  const handleCreateGroup = async (
    groupName: string,
    isScheduleFixed: boolean
  ) => {
    await createGroup({ name: groupName, isConstant: isScheduleFixed });
    await getData();
    setOpenCreateGroup(false);
  };

  return (
    <>
      <div
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Tooltip title="Create Group">
          <IconButton onClick={handleClickAddGroup}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <GroupsTable rows={rows} columns={columns} onClickRow={onClickRow} />
      <Dialog fullWidth onClose={handleCloseDeleteGroup} open={openDeleteGroup}>
        <DialogTitle>Delete Group</DialogTitle>
        <DialogContent sx={{ mt: 1, maxWidth: "600px" }}>
          <DialogContentText>
            Are you sure you want to delete the group?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteGroup}>Delete</Button>
          <Button onClick={handleCloseDeleteGroup}>Close</Button>
        </DialogActions>
      </Dialog>
      <CreateGroupDialog
        open={openCreateGroup}
        onClose={handleCloseAddGroup}
        onCreate={handleCreateGroup}
      />
    </>
  );
}

export default Groups;
