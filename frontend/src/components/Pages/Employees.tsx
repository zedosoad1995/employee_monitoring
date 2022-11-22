import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../../services/employees";
import { HeadCell } from "../../types/table";
import EmployeesTable from "../Table/Table";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getGroupsShort } from "../../services/group";

const schema = yup.object().shape({
  name: yup.string().required(),
  cardId: yup.string().required(),
  groupId: yup.string().required("group is a required field"),
});

const columns: Array<HeadCell> = [
  {
    id: "name",
    label: "Name",
    numeric: false,
  },
  {
    id: "cardId",
    label: "card Id",
    numeric: false,
  },
  {
    id: "group",
    label: "Group",
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

function Employees() {
  const [rows, setRows] = useState(null);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [openDeleteEmployeeModal, setOpenDeleteEmployeeModal] = useState(false);
  const [groups, setGroups] = useState<Array<{ id: string; name: string }>>([]);

  const [isCreateEmployee, setIsCreateEmployee] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<
    string | undefined
  >();

  const getData = async () => {
    const { employees } = await getEmployees();
    const rows = employees.map((e: any) => ({
      name: e.name,
      cardId: e.cardId,
      group: e.currGroup.name,
      edit: (
        <>
          {
            <Tooltip key={e.id} title="Edit Employee">
              <IconButton onClick={handleClickEditEmployee(e.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          }
        </>
      ),
      delete: (
        <>
          {
            <Tooltip key={e.id} title="Delete Employee">
              <IconButton onClick={handleClickDeleteEmployee(e.id)}>
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
    const getGroups = async () => {
      const { groups: shortGroups } = await getGroupsShort();
      setGroups(shortGroups);
    };

    getGroups();
    getData();
  }, []);

  const handleDeleteEmployee = async () => {
    if (selectedEmployee !== undefined) await deleteEmployee(selectedEmployee);
    await getData();
    setOpenDeleteEmployeeModal(false);
  };

  const handleCloseDeleteEmployee = () => {
    setOpenDeleteEmployeeModal(false);
  };

  const handleClickDeleteEmployee = (employeeId: string) => async () => {
    setSelectedEmployee(employeeId);
    setOpenDeleteEmployeeModal(true);
  };

  const handleClickEditEmployee = (employeeId: string) => async () => {
    clearErrors();
    setSelectedEmployee(employeeId);
    setIsCreateEmployee(false);
    const employee = await getEmployee(employeeId);

    setValue("name", employee.name);
    setValue("cardId", employee.cardId);
    setValue("groupId", employee.currGroup.id);

    setOpenEmployeeModal(true);
  };

  const handleCloseEmployeeModal = () => {
    setOpenEmployeeModal(false);
  };

  const handleClickAddEmployee = () => {
    reset();
    clearErrors();
    setIsCreateEmployee(true);
    setOpenEmployeeModal(true);
  };

  const prepareSubmit = async (data: any) => {
    if (isCreateEmployee) {
      await createEmployee(data);
    } else if (selectedEmployee) {
      await updateEmployee(selectedEmployee, data);
    }

    await getData();
    setOpenEmployeeModal(false);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      cardId: "",
      groupId: "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

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
        <Tooltip title="Create Employee">
          <IconButton onClick={handleClickAddEmployee}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <EmployeesTable rows={rows} columns={columns} />
      <Dialog
        fullWidth
        onClose={handleCloseEmployeeModal}
        open={openEmployeeModal}
      >
        <DialogTitle>
          {isCreateEmployee && <>Create New Employee</>}
          {!isCreateEmployee && <>Edit Employee</>}
        </DialogTitle>
        <DialogContent sx={{ mt: 1, maxWidth: "600px" }}>
          <form
            id="employeesForm"
            onSubmit={handleSubmit(prepareSubmit)}
            noValidate
          >
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    required
                    fullWidth
                    helperText={<>{errors.name?.message}</>}
                    {...register("name")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="cardId"
                    label="Card Id"
                    variant="outlined"
                    required
                    fullWidth
                    helperText={<>{errors.cardId?.message}</>}
                    {...register("cardId")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl required fullWidth>
                    <InputLabel id="groupId">Group</InputLabel>
                    <Controller
                      name="groupId"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          id="groupsId"
                          label="Group"
                          value={value}
                          onChange={onChange}
                        >
                          {groups.map((g) => (
                            <MenuItem key={g.id} value={g.id}>
                              {g.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText error={false}>
                      {errors.groupId?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" form="employeesForm">
            {isCreateEmployee ? "Create" : "Edit"}
          </Button>
          <Button onClick={handleCloseEmployeeModal}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        onClose={handleCloseDeleteEmployee}
        open={openDeleteEmployeeModal}
      >
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent sx={{ mt: 1, maxWidth: "600px" }}>
          <DialogContentText>
            Are you sure you want to delete the employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteEmployee}>Delete</Button>
          <Button onClick={handleCloseDeleteEmployee}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Employees;
