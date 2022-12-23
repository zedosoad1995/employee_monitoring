import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface IProps {
  open: boolean;
  onClose: () => void;
  onCreate: (groupName: string, isScheduleFixed: boolean) => void;
}

export default function ({
  open,
  onClose: handleClose,
  onCreate: handleCreate,
}: IProps) {
  const [groupName, setGroupName] = useState("");
  const [isScheduleFixed, setIsScheduleFixed] = useState(true);

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGroupName(event.currentTarget.value);
  };

  const handleCheckboxClicked = () => {
    setIsScheduleFixed((prev) => !prev);
  };

  const handleClickCreate = () => {
    handleCreate(groupName, isScheduleFixed);
  };

  useEffect(() => {}, []);

  return (
    <Dialog fullWidth onClose={handleClose} open={open}>
      <DialogTitle>Create New Group</DialogTitle>
      <DialogContent sx={{ mt: 1, maxWidth: "600px" }}>
        <Stack sx={{ mt: 1 }} spacing={1}>
          <TextField
            fullWidth
            label="Group Name"
            variant="outlined"
            placeholder="Group Name"
            value={groupName}
            onChange={handleGroupNameChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isScheduleFixed}
                onClick={handleCheckboxClicked}
              />
            }
            label="Fixed Schedule"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickCreate}>Create</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
