import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getEmployees, updateEmployee } from "../../../services/employees";
import MultipleSelects from "../../../components/MultipleSelects/MultipleSelects";

interface IProps {
  open: boolean;
  onClose: () => void;
  groupId?: string;
}

export default function ({ open, onClose: handleClose, groupId }: IProps) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const handleEmployeeSelection = (newSelectedEmployees: string[]) => {
    setSelectedEmployees(newSelectedEmployees);
  };

  const handleAdd = async () => {
    for (const employeeId of selectedEmployees) {
      const employee = employees.find((e) => e.id === employeeId);

      if (!employee) throw new Error("Employee does not exist");
      await updateEmployee(employeeId, {
        name: employee.name,
        cardId: employee.cardId,
        groupId,
      });
    }
  };

  useEffect(() => {
    getEmployees().then(({ employees }) => {
      setEmployees(employees.filter((e: any) => e.currGroup.id !== groupId));
    });
  }, []);

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>Add Employees to Group</DialogTitle>
      <DialogContent sx={{ mt: 1, maxWidth: "600px" }}>
        <MultipleSelects
          values={employees.map((e: any) => ({ id: e.id, label: e.name }))}
          onChange={handleEmployeeSelection}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleAdd}>
          Add
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
